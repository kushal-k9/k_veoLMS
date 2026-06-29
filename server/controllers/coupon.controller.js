"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const couponService = require("../services/coupon.service");
const Course = require("../models/Course");
const audit = require("../services/audit.service");

const list = asyncHandler(async (req, res) => {
  const coupons = await couponService.list();
  return ok(res, { coupons }, "Coupons fetched");
});

const create = asyncHandler(async (req, res) => {
  const coupon = await couponService.create(req.body);
  audit.recordFromReq(req, { action: "coupon.create", entityType: "coupon", entityId: coupon.id });
  return created(res, { coupon }, "Coupon created");
});

const update = asyncHandler(async (req, res) => {
  const coupon = await couponService.update(req.params.id, req.body);
  audit.recordFromReq(req, { action: "coupon.update", entityType: "coupon", entityId: coupon.id });
  return ok(res, { coupon }, "Coupon updated");
});

const remove = asyncHandler(async (req, res) => {
  await couponService.remove(req.params.id);
  audit.recordFromReq(req, { action: "coupon.delete", entityType: "coupon", entityId: req.params.id });
  return ok(res, null, "Coupon deleted");
});

/** Preview a coupon's effect for a course at checkout. */
const validate = asyncHandler(async (req, res) => {
  const { code, courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return ok(res, null, "Course not found");
  const base =
    typeof course.discountPrice === "number" && course.discountPrice < course.price
      ? course.discountPrice
      : course.price;
  const { coupon, finalPrice } = await couponService.validate(code, courseId, base);
  return ok(
    res,
    { code: coupon.code, originalPrice: base, finalPrice, discount: base - finalPrice },
    "Coupon valid"
  );
});

module.exports = { list, create, update, remove, validate };
