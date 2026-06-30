"use strict";

// Vercel serverless catch-all. Filename `[...path].js` makes this function
// handle every /api/* request natively (no rewrites needed). It reuses the
// Express app from app.js and keeps the Mongo connection warm across
// invocations (cached on the module scope).
const app = require("../app");
const { connectDB } = require("../config/db");

let dbReady;

module.exports = async (req, res) => {
  try {
    if (!dbReady) dbReady = connectDB();
    await dbReady;
  } catch (err) {
    dbReady = undefined; // allow a retry on the next request
    res.statusCode = 500;
    return res.end("Database connection failed");
  }
  return app(req, res);
};
