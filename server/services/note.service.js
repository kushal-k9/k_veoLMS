"use strict";

const mongoose = require("mongoose");
const Note = require("../models/Note");
const ApiError = require("../utils/ApiError");

/** All of a user's notes for a course, newest-updated first. */
async function listForCourse(userId, courseId) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  return Note.find({ user: userId, course: courseId }).sort({ updatedAt: -1 });
}

/**
 * Create or update the note for a single lesson. An empty body deletes the
 * note so we don't keep blank rows around.
 */
async function upsert(userId, courseId, lessonId, content) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");

  const trimmed = (content || "").trim();
  if (!trimmed) {
    await Note.deleteOne({ user: userId, course: courseId, lessonId });
    return null;
  }

  return Note.findOneAndUpdate(
    { user: userId, course: courseId, lessonId },
    { $set: { content: trimmed } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
}

async function remove(userId, courseId, lessonId) {
  await Note.deleteOne({ user: userId, course: courseId, lessonId });
  return null;
}

module.exports = { listForCourse, upsert, remove };
