"use strict";

/**
 * Password hashing (bcrypt, configurable rounds >= 12) and strength validation.
 */
const bcrypt = require("bcryptjs");
const env = require("../config/env");

const MIN_LENGTH = 8;

/** Hash a plaintext password. */
async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(env.BCRYPT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

/** Constant-time compare a candidate against a stored hash. */
async function verifyPassword(plain, hash) {
  if (!hash) return false;
  return bcrypt.compare(plain, hash);
}

/**
 * Enforce a baseline password policy.
 * @returns {string|null} an error message, or null if valid.
 */
function validateStrength(pw) {
  if (typeof pw !== "string" || pw.length < MIN_LENGTH) {
    return `Password must be at least ${MIN_LENGTH} characters long`;
  }
  if (pw.length > 128) return "Password is too long";
  if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter";
  if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter";
  if (!/[0-9]/.test(pw)) return "Password must contain a number";
  return null;
}

module.exports = { hashPassword, verifyPassword, validateStrength, MIN_LENGTH };
