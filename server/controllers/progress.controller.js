"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const progressService = require("../services/progress.service");

const get = asyncHandler(async (req, res) => {
  const progress = await progressService.get(req.user.id, req.params.courseId);
  return ok(res, { progress }, "Progress fetched");
});

const toggleLesson = asyncHandler(async (req, res) => {
  const { lessonId, complete } = req.body;
  const progress = await progressService.toggleLesson(
    req.user.id,
    req.params.courseId,
    lessonId,
    complete,
    req.user.role
  );
  return ok(res, { progress }, "Progress updated");
});

const setLastLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.body;
  const progress = await progressService.setLastLesson(
    req.user.id,
    req.params.courseId,
    lessonId,
    req.user.role
  );
  return ok(res, { progress }, "Last lesson updated");
});

module.exports = { get, toggleLesson, setLastLesson };
