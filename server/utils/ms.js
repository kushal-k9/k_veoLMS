"use strict";

/**
 * Tiny duration parser: "15m", "7d", "30s", "12h", or a raw millisecond number.
 * Returns milliseconds. Avoids pulling in an extra dependency.
 */
const UNITS = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 };

module.exports = function ms(value) {
  if (typeof value === "number") return value;
  const match = /^(\d+)\s*(ms|s|m|h|d)?$/.exec(String(value).trim());
  if (!match) throw new Error(`Invalid duration: ${value}`);
  const amount = Number(match[1]);
  const unit = match[2] || "ms";
  return amount * UNITS[unit];
};
