"use strict";

const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progress = require("../models/Progress");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

async function isEnrolled(userId, courseId) {
  if (!mongoose.isValidObjectId(courseId)) return false;
  const count = await Enrollment.countDocuments({ user: userId, course: courseId });
  return count > 0;
}

/** Enrollments for the current user (with course populated). */
async function listMine(userId) {
  return Enrollment.find({ user: userId })
    .populate("course")
    .sort({ enrolledAt: -1 });
}

/** All enrollments — admin view. */
async function listAll() {
  return Enrollment.find()
    .populate("user", "name email")
    .populate("course", "title price")
    .sort({ createdAt: -1 });
}

/**
 * Create an enrollment. Idempotent: returns the existing one if already
 * enrolled. `bumpStudents` increments the course's student counter.
 */
async function create({ userId, courseId, amount, paymentId = null, source = "direct" }) {
  const course = await Course.findById(courseId);
  if (!course) throw ApiError.notFound("Course not found");

  const existing = await Enrollment.findOne({ user: userId, course: courseId });
  if (existing) return existing;

  const enrollment = await Enrollment.create({
    user: userId,
    course: courseId,
    amount: amount ?? course.price,
    payment: paymentId,
    source,
  });
  await Course.updateOne({ _id: courseId }, { $inc: { studentsCount: 1 } });
  return enrollment;
}

/** Admin: manually enroll a user in a course (free, no payment). */
async function adminEnroll(userId, courseId) {
  if (!mongoose.isValidObjectId(userId)) throw ApiError.badRequest("Invalid user id");
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return create({ userId, courseId, amount: 0, source: "admin" });
}

/** Admin: remove a user's enrollment + their progress for that course. */
async function adminUnenroll(userId, courseId) {
  if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(courseId)) {
    throw ApiError.badRequest("Invalid id");
  }
  const deleted = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
  if (!deleted) throw ApiError.notFound("Enrollment not found");
  await Promise.all([
    Progress.deleteOne({ user: userId, course: courseId }),
    Course.updateOne(
      { _id: courseId, studentsCount: mongoose.trusted({ $gt: 0 }) },
      { $inc: { studentsCount: -1 } }
    ),
  ]);
  return deleted;
}

module.exports = { isEnrolled, listMine, listAll, create, adminEnroll, adminUnenroll };
