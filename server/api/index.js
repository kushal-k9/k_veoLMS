"use strict";

// Vercel serverless entry. A vercel.json rewrite sends every path (any depth)
// here, so this single function serves the whole Express app. The Mongo
// connection is cached on module scope to stay warm across invocations.
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
