"use strict";

/**
 * Refresh-token lifecycle: issue, rotate (with reuse detection), and revoke.
 * Access tokens are stateless; refresh tokens are tracked in the DB by `jti`
 * and stored only as SHA-256 hashes.
 */
const jwtUtil = require("../utils/jwt");
const RefreshToken = require("../models/RefreshToken");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

function buildAccessPayload(user) {
  return { sub: String(user._id || user.id), role: user.role };
}

/** Issue a fresh access + refresh pair and persist the refresh record. */
async function issueTokens(user, ctx = {}) {
  const accessToken = jwtUtil.signAccessToken(buildAccessPayload(user));
  const { token: refreshToken, jti } = jwtUtil.signRefreshToken({
    sub: String(user._id || user.id),
  });

  const decoded = jwtUtil.verifyRefreshToken(refreshToken); // for exp
  await RefreshToken.create({
    user: user._id || user.id,
    jti,
    tokenHash: jwtUtil.hashToken(refreshToken),
    expiresAt: new Date(decoded.exp * 1000),
    userAgent: ctx.userAgent || "",
    ip: ctx.ip || "",
  });

  return { accessToken, refreshToken };
}

/**
 * Rotate a refresh token: validate it, revoke the old record, and issue a new
 * pair. If a *revoked* token is replayed, treat it as theft and revoke the
 * whole family for that user.
 */
async function rotateTokens(rawToken, ctx = {}) {
  let decoded;
  try {
    decoded = jwtUtil.verifyRefreshToken(rawToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired session");
  }

  const record = await RefreshToken.findOne({ jti: decoded.jti });
  if (!record) throw ApiError.unauthorized("Session not recognized");

  // Reuse detection: a token that was already revoked is being replayed.
  if (record.revokedAt) {
    logger.audit("auth.refresh.reuse_detected", { user: String(record.user) });
    await revokeAllForUser(record.user);
    throw ApiError.unauthorized("Session reuse detected — please log in again");
  }

  if (record.tokenHash !== jwtUtil.hashToken(rawToken)) {
    throw ApiError.unauthorized("Session token mismatch");
  }
  if (record.expiresAt.getTime() <= Date.now()) {
    throw ApiError.unauthorized("Session expired");
  }

  const User = require("../models/User");
  const user = await User.findById(record.user);
  if (!user) throw ApiError.unauthorized("Account no longer exists");

  const pair = await issueTokens(user, ctx);

  // Mark old as revoked + link to its successor.
  const newDecoded = jwtUtil.verifyRefreshToken(pair.refreshToken);
  record.revokedAt = new Date();
  record.replacedBy = newDecoded.jti;
  await record.save();

  return { user, ...pair };
}

async function revokeByToken(rawToken) {
  if (!rawToken) return;
  let decoded;
  try {
    decoded = jwtUtil.verifyRefreshToken(rawToken);
  } catch {
    return; // nothing to revoke
  }
  await RefreshToken.updateOne(
    { jti: decoded.jti, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
}

async function revokeAllForUser(userId) {
  await RefreshToken.updateMany(
    { user: userId, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
}

module.exports = {
  issueTokens,
  rotateTokens,
  revokeByToken,
  revokeAllForUser,
  buildAccessPayload,
};
