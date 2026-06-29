"use strict";

const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const ApiError = require("../utils/ApiError");

/** Quizzes for a course. `forStudent` strips correct answers. */
async function listForCourse(courseId, { forStudent = false } = {}) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  const quizzes = await Quiz.find({ course: courseId }).sort({ createdAt: 1 });
  if (!forStudent) return quizzes;
  // Hide correctIndex from students taking the quiz.
  return quizzes.map((q) => {
    const obj = q.toJSON();
    obj.questions = obj.questions.map(({ correctIndex, ...rest }) => rest);
    return obj;
  });
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) throw ApiError.notFound("Quiz not found");
  const quiz = await Quiz.findById(id);
  if (!quiz) throw ApiError.notFound("Quiz not found");
  return quiz;
}

async function create(data) {
  return Quiz.create(data);
}

async function update(id, data) {
  const quiz = await Quiz.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!quiz) throw ApiError.notFound("Quiz not found");
  return quiz;
}

async function remove(id) {
  const quiz = await Quiz.findByIdAndDelete(id);
  if (!quiz) throw ApiError.notFound("Quiz not found");
  await QuizAttempt.deleteMany({ quiz: id });
  return quiz;
}

/** Auto-grade a submission against the stored correct answers. */
async function submitAttempt(userId, quizId, answers) {
  const quiz = await getById(quizId);
  const total = quiz.questions.length;
  if (total === 0) throw ApiError.badRequest("This quiz has no questions");

  let correct = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) correct += 1;
  });
  const score = Math.round((correct / total) * 100);
  const passed = score >= quiz.passingScore;

  const attempt = await QuizAttempt.create({
    quiz: quizId,
    user: userId,
    course: quiz.course,
    answers,
    score,
    passed,
  });

  return { attempt, correct, total, passingScore: quiz.passingScore };
}

/** A user's attempts for a course (latest first). */
async function listMyAttempts(userId, courseId) {
  return QuizAttempt.find({ user: userId, course: courseId }).sort({ createdAt: -1 });
}

module.exports = {
  listForCourse,
  getById,
  create,
  update,
  remove,
  submitAttempt,
  listMyAttempts,
};
