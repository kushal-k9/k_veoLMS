"use strict";

/**
 * Bundles the HTTP-hardening middleware:
 *  - helmet: secure headers (CSP, HSTS, X-Frame-Options, noSniff, ...)
 *  - express-mongo-sanitize: strips `$` and `.` from keys (NoSQL injection)
 *  - hpp: HTTP Parameter Pollution protection
 *  - xss sanitizer: neutralizes HTML/script in string inputs
 */
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss");
const logger = require("../utils/logger");

function helmetMiddleware() {
  return helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: { maxAge: 15552000, includeSubDomains: true, preload: true },
    referrerPolicy: { policy: "no-referrer" },
    crossOriginResourcePolicy: { policy: "cross-origin" }, // allow FE to load /uploads
    crossOriginOpenerPolicy: { policy: "same-origin" },
  });
}

// Recursively run user-supplied strings through the xss filter.
function sanitizeValue(value) {
  if (typeof value === "string") return xss(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) value[key] = sanitizeValue(value[key]);
    return value;
  }
  return value;
}

function xssSanitizer(req, _res, next) {
  if (req.body && typeof req.body === "object") req.body = sanitizeValue(req.body);
  next();
}

// express-mongo-sanitize@2 mutates req.query (a getter in Express 5). We run on
// Express 4 where it is writable; onSanitize logs any stripped keys.
function mongoSanitizer() {
  return mongoSanitize({
    replaceWith: "_",
    onSanitize: ({ req, key }) => {
      logger.warn(`Stripped prohibited key "${key}" from ${req.method} ${req.path}`);
    },
  });
}

module.exports = {
  helmetMiddleware,
  mongoSanitizer,
  hpp,
  xssSanitizer,
};
