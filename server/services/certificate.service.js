"use strict";

const mongoose = require("mongoose");
const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const Progress = require("../models/Progress");
const logger = require("../utils/logger");

/** Total lessons across a course's sections. */
function countLessons(course) {
  return (course.sections || []).reduce((a, s) => a + (s.lessons?.length || 0), 0);
}

/**
 * Issue a certificate if the user has completed every lesson. Idempotent — a
 * second call returns the existing certificate. Never throws (called from the
 * progress flow), logging on failure instead.
 */
async function issueIfComplete(userId, courseId) {
  try {
    const [course, progress] = await Promise.all([
      Course.findById(courseId).lean(),
      Progress.findOne({ user: userId, course: courseId }).lean(),
    ]);
    if (!course || !progress) return null;
    const total = countLessons(course);
    if (total === 0 || (progress.completedLessonIds || []).length < total) return null;

    const existing = await Certificate.findOne({ user: userId, course: courseId });
    if (existing) return existing;

    return await Certificate.create({
      user: userId,
      course: courseId,
      code: Certificate.makeCode(),
    });
  } catch (err) {
    logger.error("certificate.issueIfComplete failed", { error: err.message });
    return null;
  }
}

/** A user's certificates with course populated. */
async function listMine(userId) {
  return Certificate.find({ user: userId })
    .populate("course", "title thumbnail instructor")
    .sort({ issuedAt: -1 });
}

/** Public verification lookup by code. */
async function getByCode(code) {
  if (!code) return null;
  return Certificate.findOne({ code })
    .populate("course", "title instructor")
    .populate("user", "name");
}

/** Admin: all issued certificates. */
async function listAll() {
  return Certificate.find()
    .populate("course", "title")
    .populate("user", "name email")
    .sort({ issuedAt: -1 });
}

module.exports = { issueIfComplete, listMine, getByCode, listAll };
