"use strict";

/**
 * HTTP request logging via morgan, piped through winston so all logs share one
 * sink/format. Concise output in dev, combined (Apache-style) in production.
 */
const morgan = require("morgan");
const env = require("../config/env");
const logger = require("../utils/logger");

const format = env.isProd ? "combined" : "dev";

const requestLogger = morgan(format, {
  stream: logger.stream,
  skip: (req) => req.path === "/api/health", // avoid noise from health checks
});

module.exports = { requestLogger };
