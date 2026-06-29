"use strict";

const Setting = require("../models/Setting");

// Defaults used when a setting hasn't been written yet.
const DEFAULTS = {
  currency: "usd",
  taxPercent: 0,
  platformName: "VeoLMS",
  stripePublishableKey: "",
};

const SECRET_KEYS = new Set(["stripeSecretKey"]);

/** Read a single setting value (falling back to a default). */
async function get(key) {
  const doc = await Setting.findOne({ key });
  if (doc) return doc.value;
  return DEFAULTS[key];
}

/** All settings as a key→value map, with secrets masked. */
async function getAll() {
  const docs = await Setting.find();
  const map = { ...DEFAULTS };
  for (const doc of docs) {
    map[doc.key] = doc.secret && doc.value ? "********" : doc.value;
  }
  return map;
}

/** Upsert many settings at once. Empty masked secrets are ignored. */
async function setMany(updates = {}) {
  const ops = [];
  for (const [key, value] of Object.entries(updates)) {
    // Skip masked secret placeholders so we don't overwrite real keys.
    if (SECRET_KEYS.has(key) && value === "********") continue;
    ops.push(
      Setting.updateOne(
        { key },
        { $set: { value, secret: SECRET_KEYS.has(key) } },
        { upsert: true }
      )
    );
  }
  await Promise.all(ops);
  return getAll();
}

module.exports = { get, getAll, setMany, DEFAULTS };
