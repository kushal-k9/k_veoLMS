"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const noteService = require("../services/note.service");

const listForCourse = asyncHandler(async (req, res) => {
  const notes = await noteService.listForCourse(req.user.id, req.params.courseId);
  return ok(res, { notes }, "Notes fetched");
});

const upsert = asyncHandler(async (req, res) => {
  const note = await noteService.upsert(
    req.user.id,
    req.params.courseId,
    req.params.lessonId,
    req.body.content
  );
  return ok(res, { note }, "Note saved");
});

const remove = asyncHandler(async (req, res) => {
  await noteService.remove(req.user.id, req.params.courseId, req.params.lessonId);
  return ok(res, null, "Note deleted");
});

module.exports = { listForCourse, upsert, remove };
