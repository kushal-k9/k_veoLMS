"use strict";

const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const env = require("./config/env");
const logger = require("./utils/logger");
const { connectDB, disconnectDB } = require("./config/db");

const {
  helmetMiddleware,
  mongoSanitizer,
  hpp,
  xssSanitizer,
} = require("./middlewares/security.middleware");
const { requestLogger } = require("./middlewares/logger.middleware");
const { globalLimiter } = require("./middlewares/rateLimit.middleware");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const { UPLOAD_DIR } = require("./middlewares/upload.middleware");
const paymentController = require("./controllers/payment.controller");
const apiRoutes = require("./routes");

const app = express();

// Behind a reverse proxy (Heroku/nginx), trust the first proxy so secure
// cookies, rate-limit IPs, and req.ip work correctly. Assumes HTTPS upstream.
if (env.TRUST_PROXY) app.set("trust proxy", 1);

// Never advertise the framework.
app.disable("x-powered-by");

// --- Stripe webhook: must receive the RAW body for signature verification,
// so it is mounted BEFORE the JSON body parser. ---
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhook
);

// --- Security headers ---
app.use(helmetMiddleware());

// --- CORS: strict allowlist of the frontend origin(s), with credentials. ---
// CLIENT_ORIGIN may be a comma-separated list; trailing slashes are normalized
// away so a config typo (e.g. "https://site.app/") doesn't silently break CORS.
const stripTrailingSlash = (s) => s.replace(/\/+$/, "");
const allowedOrigins = env.CLIENT_ORIGIN.split(",")
  .map((o) => stripTrailingSlash(o.trim()))
  .filter(Boolean);
app.use(
  cors({
  origin:  "https://veolms.netlify.app" || env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  })
);

// --- Parsers (with strict body-size limits) ---
app.use(express.json({ limit: env.JSON_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: env.JSON_BODY_LIMIT }));
app.use(cookieParser(env.COOKIE_SECRET));

// --- Injection / pollution hardening ---
app.use(mongoSanitizer());
app.use(hpp());
app.use(xssSanitizer);

// --- Logging + global rate limit ---
app.use(requestLogger);
app.use("/api", globalLimiter);

// --- Static: uploaded files (served read-only from storage/uploads) ---
app.use(
  "/uploads",
  express.static(UPLOAD_DIR, { dotfiles: "deny", index: false, maxAge: "1d" })
);

// --- API ---
app.use("/api", apiRoutes);

// --- 404 + centralized error handler (must be last) ---
app.use(notFound);
app.use(errorHandler);

// --- Boot ---
let server;
async function start() {
  await connectDB();
  server = app.listen(env.PORT, () => {
    logger.info(`🚀 VeoLMS API listening on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`   CORS origin allowed: ${env.CLIENT_ORIGIN}`);
  });
}

// --- Graceful shutdown ---
async function shutdown(signal) {
  logger.info(`${signal} received — shutting down gracefully...`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    logger.info("HTTP server closed");
  }
  await disconnectDB();
  process.exit(0);
}

["SIGINT", "SIGTERM"].forEach((sig) =>
  process.on(sig, () => shutdown(sig).catch(() => process.exit(1)))
);

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled promise rejection: ${reason}`);
});
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught exception: ${err.message}`, { stack: err.stack });
  // Let graceful shutdown attempt to run, then exit.
  shutdown("uncaughtException").catch(() => process.exit(1));
});

if (require.main === module) {
  start().catch((err) => {
    logger.error(`Failed to start server: ${err.message}`, { stack: err.stack });
    process.exit(1);
  });
}

module.exports = app;
