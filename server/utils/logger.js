"use strict";

/**
 * Winston logger.
 * - Pretty, colorized console output in development.
 * - JSON to console + rotating files in production (storage/logs).
 * - A dedicated `audit` logger for security-sensitive auth events.
 */
const path = require("path");
const fs = require("fs");
const winston = require("winston");
const env = require("../config/env");

const logDir = path.resolve(__dirname, "..", "storage", "logs");
fs.mkdirSync(logDir, { recursive: true });

const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} ${level}: ${message}${rest}`;
  })
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: env.isDev ? "debug" : "info",
  format: env.isProd ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

if (env.isProd) {
  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    })
  );
}

// Separate audit trail for auth events (login, logout, refresh, lockouts…).
const audit = winston.createLogger({
  level: "info",
  format: prodFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "audit.log"),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 10,
    }),
  ],
});
if (env.isDev) audit.add(new winston.transports.Console({ format: devFormat }));

/**
 * Record a structured audit event.
 * @param {string} event  e.g. "auth.login.success"
 * @param {object} data   contextual fields (never include raw passwords/tokens)
 */
logger.audit = (event, data = {}) => audit.info(event, { event, ...data });

// Stream adapter so morgan writes through winston.
logger.stream = {
  write: (line) => logger.http?.(line.trim()) ?? logger.info(line.trim()),
};

module.exports = logger;
