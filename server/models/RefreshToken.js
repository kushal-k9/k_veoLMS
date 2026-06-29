"use strict";

const mongoose = require("mongoose");

/**
 * Server-side record of issued refresh tokens, enabling rotation + revocation.
 * Only the SHA-256 hash of the token is stored — never the raw value.
 */
const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jti: { type: String, required: true, unique: true, index: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    // When rotated, points at the jti that replaced this one (reuse detection).
    replacedBy: { type: String, default: null },
    userAgent: { type: String, default: "" },
    ip: { type: String, default: "" },
  },
  { timestamps: true }
);

// TTL index: Mongo auto-removes the document once it expires.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

refreshTokenSchema.virtual("isActive").get(function () {
  return !this.revokedAt && this.expiresAt.getTime() > Date.now();
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
