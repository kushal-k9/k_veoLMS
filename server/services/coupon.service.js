"use strict";

const mongoose = require("mongoose");
const Coupon = require("../models/Coupon");
const ApiError = require("../utils/ApiError");

async function list() {
  return Coupon.find().populate("course", "title").sort({ createdAt: -1 });
}

async function create(data) {
  const exists = await Coupon.findOne({ code: data.code.toUpperCase() });
  if (exists) throw ApiError.conflict("A coupon with that code already exists");
  return Coupon.create(data);
}

async function update(id, data) {
  const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!coupon) throw ApiError.notFound("Coupon not found");
  return coupon;
}

async function remove(id) {
  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) throw ApiError.notFound("Coupon not found");
  return coupon;
}

/**
 * Validate a coupon for a course + base price. Returns the coupon and the
 * resulting discounted price. Throws if the code is invalid/expired/out of scope.
 */
async function validate(code, courseId, price) {
  if (!code) throw ApiError.badRequest("No coupon code provided");
  const coupon = await Coupon.findOne({ code: String(code).toUpperCase() });
  if (!coupon || !coupon.isUsable()) throw ApiError.badRequest("Invalid or expired coupon");
  if (coupon.course && String(coupon.course) !== String(courseId)) {
    throw ApiError.badRequest("This coupon doesn't apply to this course");
  }
  return { coupon, finalPrice: coupon.apply(price) };
}

/** Increment usage after a successful purchase. */
async function markUsed(couponId) {
  if (!mongoose.isValidObjectId(couponId)) return;
  await Coupon.updateOne({ _id: couponId }, { $inc: { usedCount: 1 } });
}

module.exports = { list, create, update, remove, validate, markUsed };
