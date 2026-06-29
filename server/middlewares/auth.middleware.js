"use strict";

/**
 * Authentication + Role-Based Access Control.
 * Access tokens are read from the `Authorization: Bearer <token>` header
 * (never a cookie) so the API is immune to CSRF on Bearer-authed routes.
 */
const { verifyAccessToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const { STAFF_ROLES, ROLE_PERMISSIONS } = require("../config/constants");

/** Permissions granted to a role (empty array for unknown roles). */
function permissionsForRole(role) {
  return ROLE_PERMISSIONS[role] || [];
}

function extractToken(req) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) return header.slice(7).trim();
  return null;
}

/** Reject the request unless a valid access token is present. */
const requireAuth = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) throw ApiError.unauthorized("Authentication required");

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired access token");
  }

  // Confirm the account still exists (handles deleted users with live tokens).
  const user = await User.findById(payload.sub);
  if (!user) throw ApiError.unauthorized("Account no longer exists");
  // Banned accounts are rejected even with a valid token.
  if (user.status === "banned") throw ApiError.forbidden("Account suspended");

  req.user = { id: String(user._id), role: user.role, email: user.email, doc: user };
  next();
});

/** Attach req.user if a valid token is present, but never reject. */
const optionalAuth = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next();
  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);
    if (user) {
      req.user = { id: String(user._id), role: user.role, email: user.email, doc: user };
    }
  } catch {
    /* ignore — treat as anonymous */
  }
  next();
});

/** Require one of the given roles. Must run after requireAuth. */
function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden("Insufficient role"));
    }
    next();
  };
}

/** Require any staff role (super-admin / admin / instructor / support). */
function requireStaff(req, _res, next) {
  if (!req.user) return next(ApiError.unauthorized());
  if (!STAFF_ROLES.includes(req.user.role)) {
    return next(ApiError.forbidden("Staff access required"));
  }
  next();
}

/**
 * Require one of the given permissions (OR semantics). Resolves the caller's
 * permissions from their role. Must run after requireAuth.
 */
function requirePermission(...perms) {
  return (req, _res, next) => {
    if (!req.user) return next(ApiError.unauthorized());
    const granted = permissionsForRole(req.user.role);
    const allowed = perms.some((p) => granted.includes(p));
    if (!allowed) return next(ApiError.forbidden("Insufficient permissions"));
    next();
  };
}

module.exports = {
  requireAuth,
  optionalAuth,
  requireRole,
  requireStaff,
  requirePermission,
  permissionsForRole,
};
