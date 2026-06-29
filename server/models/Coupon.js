"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** A discount code applied at checkout. */
const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    type: { type: String, enum: ["percent", "flat"], default: "percent" },
    value: { type: Number, required: true, min: 0 }, // percent (0-100) or flat amount
    // null => applies to any course; otherwise restricted to one course.
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
    expiresAt: { type: Date, default: null },
    usageLimit: { type: Number, default: 0 }, // 0 = unlimited
    usedCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

/** Is the coupon currently usable (active, unexpired, under its limit)? */
couponSchema.methods.isUsable = function isUsable() {
  if (!this.active) return false;
  if (this.expiresAt && this.expiresAt.getTime() < Date.now()) return false;
  if (this.usageLimit > 0 && this.usedCount >= this.usageLimit) return false;
  return true;
};

/** Compute the discounted price for a given base price. */
couponSchema.methods.apply = function apply(price) {
  const discount = this.type === "percent" ? (price * this.value) / 100 : this.value;
  return Math.max(0, Math.round((price - discount) * 100) / 100);
};

module.exports = mongoose.model("Coupon", couponSchema);
