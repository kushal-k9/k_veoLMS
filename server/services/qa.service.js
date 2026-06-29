"use strict";

const mongoose = require("mongoose");
const Question = require("../models/Question");
const ApiError = require("../utils/ApiError");

/** List questions for a course (optionally a lesson). Students never see hidden. */
async function list(courseId, { lessonId, includeHidden = false } = {}) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  const filter = { course: courseId };
  if (lessonId) filter.lessonId = lessonId;
  if (!includeHidden) filter.hidden = false;
  return Question.find(filter).sort({ createdAt: -1 });
}

/** All questions across courses (admin moderation queue). */
async function listAll() {
  return Question.find()
    .populate("course", "title")
    .sort({ createdAt: -1 });
}

async function ask(userId, authorName, { courseId, lessonId, body }) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  return Question.create({
    course: courseId,
    lessonId: lessonId || "",
    user: userId,
    authorName,
    body,
  });
}

async function answer(questionId, userId, authorName, { body, isInstructor }) {
  const question = await Question.findById(questionId);
  if (!question) throw ApiError.notFound("Question not found");
  question.answers.push({ user: userId, authorName, body, isInstructor: Boolean(isInstructor) });
  await question.save();
  return question;
}

/** Moderation: hide/unhide. */
async function setHidden(questionId, hidden) {
  const question = await Question.findByIdAndUpdate(
    questionId,
    { hidden },
    { new: true }
  );
  if (!question) throw ApiError.notFound("Question not found");
  return question;
}

async function remove(questionId) {
  const question = await Question.findByIdAndDelete(questionId);
  if (!question) throw ApiError.notFound("Question not found");
  return question;
}

module.exports = { list, listAll, ask, answer, setHidden, remove };
