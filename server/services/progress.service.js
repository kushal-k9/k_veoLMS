"use strict";

const mongoose = require("mongoose");
const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const ApiError = require("../utils/ApiError");
const certificateService = require("./certificate.service");
const { STAFF_ROLES } = require("../config/constants");

const MAX_RECENT = 8;

async function assertEnrolled(userId, courseId) {
  if (!mongoose.isValidObjectId(courseId)) {
    throw ApiError.notFound("Course not found");
  }
  const enrolled = await Enrollment.exists({ user: userId, course: courseId });
  if (!enrolled) throw ApiError.forbidden("You are not enrolled in this course");
}

/**
 * Enforce drip release: a lesson whose `availableAt` is in the future is locked
 * for everyone except staff/admins, regardless of payment/enrollment.
 */
async function assertLessonReleased(courseId, lessonId, userRole) {
  if (STAFF_ROLES.includes(userRole)) return; // admins/instructors bypass drip
  const course = await Course.findById(courseId).select("sections").lean();
  if (!course) return;
  for (const section of course.sections || []) {
    const lesson = (section.lessons || []).find((l) => String(l._id) === String(lessonId));
    if (!lesson) continue;
    if (lesson.availableAt && new Date(lesson.availableAt).getTime() > Date.now()) {
      throw ApiError.forbidden("This lesson isn't available yet (scheduled release).");
    }
    return;
  }
}

/** Get (or lazily shape) a user's progress for a course. */
async function get(userId, courseId) {
  if (!mongoose.isValidObjectId(courseId)) {
    throw ApiError.notFound("Course not found");
  }
  const doc = await Progress.findOne({ user: userId, course: courseId });
  return (
    doc || {
      course: courseId,
      completedLessonIds: [],
      lastLessonId: null,
      recentlyWatched: [],
    }
  );
}

async function toggleLesson(userId, courseId, lessonId, complete, userRole) {
  await assertEnrolled(userId, courseId);
  await assertLessonReleased(courseId, lessonId, userRole);
  const update = complete
    ? { $addToSet: { completedLessonIds: lessonId } }
    : { $pull: { completedLessonIds: lessonId } };
  const progress = await Progress.findOneAndUpdate(
    { user: userId, course: courseId },
    update,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  // Award a certificate when the course is fully complete (fire-and-forget).
  if (complete) certificateService.issueIfComplete(userId, courseId);
  return progress;
}

async function setLastLesson(userId, courseId, lessonId, userRole) {
  await assertEnrolled(userId, courseId);
  await assertLessonReleased(courseId, lessonId, userRole);
  // Remove any prior entry for this lesson, prepend the new one, cap the list.
  const doc = await Progress.findOne({ user: userId, course: courseId });
  const recent = (doc?.recentlyWatched || []).filter(
    (r) => r.lessonId !== lessonId
  );
  recent.unshift({ lessonId, courseId: String(courseId), at: new Date() });

  return Progress.findOneAndUpdate(
    { user: userId, course: courseId },
    { $set: { lastLessonId: lessonId, recentlyWatched: recent.slice(0, MAX_RECENT) } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
}

module.exports = { get, toggleLesson, setLastLesson };
