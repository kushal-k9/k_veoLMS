"use strict";

/**
 * Mongoose connection management with retry + graceful shutdown.
 */
const dns = require("dns");
const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

// Some Windows/router DNS resolvers refuse SRV queries, which breaks
// `mongodb+srv://` Atlas URIs with "querySrv ECONNREFUSED". If we detect that,
// fall back to public resolvers (Google/Cloudflare) for the retry.
let dnsFallbackApplied = false;
function isSrvDnsError(err) {
  return /querySrv|ESERVFAIL|ECONNREFUSED|ETIMEOUT|ENOTFOUND/i.test(
    err?.message || ""
  );
}
function applyDnsFallback() {
  if (dnsFallbackApplied) return;
  dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);
  dnsFallbackApplied = true;
  logger.warn("Applied public DNS fallback (8.8.8.8/1.1.1.1) for SRV lookup");
}

// Strict query filtering: unknown fields in queries are stripped, not silently
// matched. Also enable strict schema mode globally.
mongoose.set("strictQuery", true);
mongoose.set("sanitizeFilter", true); // strips query operators from filter objects

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

async function connectWithRetry(attempt = 1) {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      // Fail fast instead of buffering queries while disconnected (prevents
      // "buffering leaks" where requests hang silently).
      bufferCommands: false,
    });
    logger.info("✅ MongoDB connected");
  } catch (err) {
    logger.error(
      `MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}): ${err.message}`
    );
    // On the first DNS/SRV failure, switch to public resolvers and retry now.
    if (isSrvDnsError(err) && !dnsFallbackApplied) {
      applyDnsFallback();
      return connectWithRetry(attempt + 1);
    }
    if (attempt >= MAX_RETRIES) {
      logger.error("Exhausted MongoDB connection retries. Exiting.");
      process.exit(1);
    }
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    return connectWithRetry(attempt + 1);
  }
}

// Default per-operation query timeout so a slow/stuck query can't hang a request.
mongoose.Query.prototype.setOptions = (function (orig) {
  return function (...args) {
    const q = orig.apply(this, args);
    if (q.getOptions().maxTimeMS === undefined) q.maxTimeMS(20000);
    return q;
  };
})(mongoose.Query.prototype.setOptions);

mongoose.connection.on("disconnected", () =>
  logger.warn("MongoDB disconnected")
);
mongoose.connection.on("reconnected", () =>
  logger.info("MongoDB reconnected")
);
mongoose.connection.on("error", (err) =>
  logger.error(`MongoDB error: ${err.message}`)
);

async function disconnectDB() {
  try {
    await mongoose.connection.close(false);
    logger.info("MongoDB connection closed");
  } catch (err) {
    logger.error(`Error closing MongoDB: ${err.message}`);
  }
}

module.exports = { connectDB: connectWithRetry, disconnectDB, mongoose };
