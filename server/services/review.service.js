"use strict";

const mongoose = require("mongoose");
const Review = require("../models/Review");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/ApiError");

/** Recompute and persist a course's aggregate rating from visible reviews. */
async function recomputeRating(courseId) {
  const agg = await Review.aggregate([
    { $match: { course: new mongoose.Types.ObjectId(String(courseId)), hidden: false } },
    { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  const rating = agg[0] ? Math.round(agg[0].avg * 10) / 10 : 0;
  const ratingCount = agg[0]?.count || 0;
  await Course.updateOne({ _id: courseId }, { $set: { rating, ratingCount } });
  return { rating, ratingCount };
}

async function listForCourse(courseId) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  return Review.find({ course: courseId, hidden: false }).sort({ createdAt: -1 });
}

/** Create or update the caller's review. Requires enrollment. */
async function upsert(userId, authorName, courseId, { rating, body }) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  const enrolled = await Enrollment.exists({ user: userId, course: courseId });
  if (!enrolled) throw ApiError.forbidden("Enroll in the course to review it");

  const review = await Review.findOneAndUpdate(
    { user: userId, course: courseId },
    { $set: { rating, body: body || "", authorName } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  await recomputeRating(courseId);
  return review;
}

/** The caller's review for a course, if any. */
async function getMine(userId, courseId) {
  return Review.findOne({ user: userId, course: courseId });
}

async function listAll() {
  return Review.find().populate("course", "title").sort({ createdAt: -1 });
}

async function setHidden(id, hidden) {
  const review = await Review.findByIdAndUpdate(id, { hidden }, { new: true });
  if (!review) throw ApiError.notFound("Review not found");
  await recomputeRating(review.course);
  return review;
}

async function remove(id) {
  const review = await Review.findByIdAndDelete(id);
  if (!review) throw ApiError.notFound("Review not found");
  await recomputeRating(review.course);
  return review;
}

module.exports = { listForCourse, upsert, getMine, listAll, setHidden, remove };
