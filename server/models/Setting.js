"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** A single platform setting (tax, currency, gateway keys…) as key/value. */
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true, index: true },
    value: { type: mongoose.Schema.Types.Mixed, default: null },
    // Secret settings (gateway keys) are masked when read by the client.
    secret: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

module.exports = mongoose.model("Setting", settingSchema);
