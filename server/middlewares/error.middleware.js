"use strict";

/**
 * 404 handler + centralized error handler.
 * Operational (expected) errors return their message; everything else returns
 * a generic message in production while the full error is logged server-side.
 * Stack traces are never sent to the client in production.
 */
const env = require("../config/env");
const logger = require("../utils/logger");
const ApiError = require("../utils/ApiError");

function notFound(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.details || undefined;

  // Normalize common library errors into clean client responses.
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    message = "Validation failed";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `That ${field} is already in use`;
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  } else if (err.type === "entity.too.large") {
    statusCode = 413;
    message = "Request payload too large";
  } else if (err.code === "EBADCSRFTOKEN" || err.code === "ERR_BAD_CSRF_TOKEN") {
    statusCode = 403;
    message = "Invalid CSRF token";
  }

  // Log: 5xx as error (with stack), 4xx as warn.
  const logPayload = {
    method: req.method,
    url: req.originalUrl,
    status: statusCode,
    ip: req.ip,
  };
  if (statusCode >= 500) {
    logger.error(`${message}`, { ...logPayload, stack: err.stack });
    if (env.isProd) message = "Something went wrong. Please try again later.";
  } else {
    logger.warn(`${message}`, logPayload);
  }

  const body = { success: false, data: null, message };
  if (errors) body.errors = errors;
  if (!env.isProd && statusCode >= 500) body.stack = err.stack;

  res.status(statusCode).json(body);
}

module.exports = { notFound, errorHandler };
