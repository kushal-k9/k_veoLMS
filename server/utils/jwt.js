"use strict";

/**
 * JWT signing/verification for short-lived access tokens and long-lived
 * refresh tokens. Access and refresh tokens use *different* secrets so a leaked
 * access secret cannot mint refresh tokens (and vice versa).
 */
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const ISSUER = "veolms";

function signAccessToken(payload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_TTL,
    issuer: ISSUER,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, { issuer: ISSUER });
}

/**
 * Refresh tokens carry a random `jti` (token id) so individual tokens can be
 * tracked and rotated/revoked server-side.
 */
function signRefreshToken(payload) {
  const jti = crypto.randomUUID();
  const token = jwt.sign({ ...payload, jti }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_TTL,
    issuer: ISSUER,
  });
  return { token, jti };
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET, { issuer: ISSUER });
}

/** SHA-256 hash for storing refresh tokens at rest (never store them raw). */
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
};
