"use strict";

const mongoose = require("mongoose");
const Announcement = require("../models/Announcement");
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/ApiError");

/**
 * Announcements relevant to a user: all platform-wide ones plus course-scoped
 * ones for courses they're enrolled in.
 */
async function listForUser(userId) {
  const enrollments = await Enrollment.find({ user: userId }).select("course").lean();
  const courseIds = enrollments.map((e) => e.course);
  return Announcement.find({
    $or: [
      { scope: "platform" },
      { scope: "course", course: mongoose.trusted({ $in: courseIds }) },
    ],
  })
    .populate("course", "title")
    .sort({ createdAt: -1 })
    .limit(50);
}

/** Admin: every announcement. */
async function listAll() {
  return Announcement.find().populate("course", "title").sort({ createdAt: -1 });
}

async function create(author, authorName, { scope, course, title, body }) {
  if (scope === "course" && !mongoose.isValidObjectId(course)) {
    throw ApiError.badRequest("A course is required for course-scoped announcements");
  }
  return Announcement.create({
    scope,
    course: scope === "course" ? course : null,
    title,
    body,
    author,
    authorName,
  });
}

async function remove(id) {
  const doc = await Announcement.findByIdAndDelete(id);
  if (!doc) throw ApiError.notFound("Announcement not found");
  return doc;
}

module.exports = { listForUser, listAll, create, remove };
