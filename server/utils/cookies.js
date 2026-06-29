"use strict";

/**
 * Centralized cookie options so security flags are consistent everywhere.
 * - httpOnly: JS can never read the refresh token (XSS can't exfiltrate it).
 * - secure: HTTPS-only in production.
 * - sameSite: 'none' in prod (cross-site SPA) requires secure; 'lax' in dev.
 */
const env = require("../config/env");
const ms = require("../utils/ms");
const { REFRESH_COOKIE } = require("../config/constants");

function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? "none" : "lax",
    path: "/",
  };
}

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE, token, {
    ...baseCookieOptions(),
    maxAge: ms(env.JWT_REFRESH_TTL),
  });
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE, baseCookieOptions());
}

module.exports = { baseCookieOptions, setRefreshCookie, clearRefreshCookie };
