"use strict";

const mongoose = require("mongoose");
const crypto = require("crypto");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** Awarded when a learner completes 100% of a course. */
const certificateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    // Public verification code (short, unguessable).
    code: { type: String, required: true, unique: true, index: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

certificateSchema.index({ user: 1, course: 1 }, { unique: true });

/** Generate a human-friendly certificate code. */
certificateSchema.statics.makeCode = function makeCode() {
  return `VEO-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};

module.exports = mongoose.model("Certificate", certificateSchema);
