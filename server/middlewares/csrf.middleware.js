"use strict";

/**
 * CSRF protection (double-submit cookie pattern via csrf-csrf) for
 * cookie-authenticated, state-changing routes (refresh, logout). Bearer-token
 * routes don't need it because the token isn't sent automatically by browsers.
 *
 * Flow: client GETs /api/auth/csrf-token -> receives a token + sets a cookie;
 * it then echoes the token in the `x-csrf-token` header on protected requests.
 */
const { doubleCsrf } = require("csrf-csrf");
const env = require("../config/env");

const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => env.CSRF_SECRET,
  // Stateless API (JWT) — a constant session id keeps double-submit valid.
  getSessionIdentifier: () => "veolms-csrf",
  cookieName: env.isProd ? "__Host-veolms.csrf" : "veolms.csrf",
  cookieOptions: {
    httpOnly: true,
    sameSite: env.isProd ? "none" : "lax",
    secure: env.isProd,
    path: "/",
  },
  size: 64,
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

module.exports = { generateCsrfToken: generateToken, csrfProtection: doubleCsrfProtection };
