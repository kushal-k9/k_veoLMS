"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const reviewService = require("../services/review.service");
const audit = require("../services/audit.service");

const listForCourse = asyncHandler(async (req, res) => {
  const reviews = await reviewService.listForCourse(req.params.courseId);
  return ok(res, { reviews }, "Reviews fetched");
});

const getMine = asyncHandler(async (req, res) => {
  const review = await reviewService.getMine(req.user.id, req.params.courseId);
  return ok(res, { review }, "Review fetched");
});

const upsert = asyncHandler(async (req, res) => {
  const review = await reviewService.upsert(
    req.user.id,
    req.user.doc?.name || "",
    req.params.courseId,
    req.body
  );
  return created(res, { review }, "Review saved");
});

const listAll = asyncHandler(async (req, res) => {
  const reviews = await reviewService.listAll();
  return ok(res, { reviews }, "Reviews fetched");
});

const setHidden = asyncHandler(async (req, res) => {
  const review = await reviewService.setHidden(req.params.id, req.body.hidden);
  audit.recordFromReq(req, {
    action: req.body.hidden ? "review.hide" : "review.unhide",
    entityType: "review",
    entityId: req.params.id,
  });
  return ok(res, { review }, "Review updated");
});

const remove = asyncHandler(async (req, res) => {
  await reviewService.remove(req.params.id);
  audit.recordFromReq(req, { action: "review.delete", entityType: "review", entityId: req.params.id });
  return ok(res, null, "Review deleted");
});

module.exports = { listForCourse, getMine, upsert, listAll, setHidden, remove };
