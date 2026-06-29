"use strict";

/**
 * Rate limiting. A relaxed global limiter protects the whole API; a strict
 * limiter throttles auth endpoints to blunt credential-stuffing/brute force.
 */
const rateLimit = require("express-rate-limit");
const { fail } = require("../utils/response");

function handler(_req, res) {
  return fail(res, 429, "Too many requests. Please slow down and try again later.");
}

const commonOptions = {
  standardHeaders: true,
  legacyHeaders: false,
  handler,
};

// 300 requests / 15 min per IP across the API.
const globalLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  max: 300,
});

// 20 requests / 15 min per IP for sensitive auth actions.
const authLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  max: 20,
  // Don't count successful logins/refreshes against the limit.
  skipSuccessfulRequests: true,
});

// 5 OTP/verification requests / 10 min per IP.
const otpLimiter = rateLimit({
  ...commonOptions,
  windowMs: 10 * 60 * 1000,
  max: 8,
});

module.exports = { globalLimiter, authLimiter, otpLimiter };
