"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const quizService = require("../services/quiz.service");
const audit = require("../services/audit.service");

const listForCourse = asyncHandler(async (req, res) => {
  const quizzes = await quizService.listForCourse(req.params.courseId, { forStudent: true });
  return ok(res, { quizzes }, "Quizzes fetched");
});

// Admin: full quizzes (with correct answers) for building.
const listForCourseAdmin = asyncHandler(async (req, res) => {
  const quizzes = await quizService.listForCourse(req.params.courseId);
  return ok(res, { quizzes }, "Quizzes fetched");
});

const create = asyncHandler(async (req, res) => {
  const quiz = await quizService.create(req.body);
  audit.recordFromReq(req, { action: "quiz.create", entityType: "quiz", entityId: quiz.id });
  return created(res, { quiz }, "Quiz created");
});

const update = asyncHandler(async (req, res) => {
  const quiz = await quizService.update(req.params.id, req.body);
  audit.recordFromReq(req, { action: "quiz.update", entityType: "quiz", entityId: quiz.id });
  return ok(res, { quiz }, "Quiz updated");
});

const remove = asyncHandler(async (req, res) => {
  await quizService.remove(req.params.id);
  audit.recordFromReq(req, { action: "quiz.delete", entityType: "quiz", entityId: req.params.id });
  return ok(res, null, "Quiz deleted");
});

const submit = asyncHandler(async (req, res) => {
  const result = await quizService.submitAttempt(req.user.id, req.params.id, req.body.answers);
  return created(res, result, "Quiz submitted");
});

const myAttempts = asyncHandler(async (req, res) => {
  const attempts = await quizService.listMyAttempts(req.user.id, req.params.courseId);
  return ok(res, { attempts }, "Attempts fetched");
});

module.exports = {
  listForCourse,
  listForCourseAdmin,
  create,
  update,
  remove,
  submit,
  myAttempts,
};
