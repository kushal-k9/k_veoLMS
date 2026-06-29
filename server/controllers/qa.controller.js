"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const qaService = require("../services/qa.service");
const audit = require("../services/audit.service");
const notificationService = require("../services/notification.service");
const { STAFF_ROLES } = require("../config/constants");

function isStaff(req) {
  return Boolean(req.user && STAFF_ROLES.includes(req.user.role));
}

const list = asyncHandler(async (req, res) => {
  const questions = await qaService.list(req.params.courseId, {
    lessonId: req.query.lessonId,
    includeHidden: isStaff(req),
  });
  return ok(res, { questions }, "Questions fetched");
});

const listAll = asyncHandler(async (req, res) => {
  const questions = await qaService.listAll();
  return ok(res, { questions }, "Questions fetched");
});

const ask = asyncHandler(async (req, res) => {
  const question = await qaService.ask(req.user.id, req.user.doc?.name || "", {
    courseId: req.body.courseId,
    lessonId: req.body.lessonId,
    body: req.body.body,
  });
  return created(res, { question }, "Question posted");
});

const answer = asyncHandler(async (req, res) => {
  const question = await qaService.answer(req.params.id, req.user.id, req.user.doc?.name || "", {
    body: req.body.body,
    isInstructor: isStaff(req),
  });
  // Notify the asker when someone else replies.
  if (String(question.user) !== String(req.user.id)) {
    notificationService.notify(question.user, {
      type: "qa_reply",
      title: "New reply to your question",
      body: req.body.body.slice(0, 140),
      link: `/courses/${question.course}`,
    });
  }
  return created(res, { question }, "Answer posted");
});

const setHidden = asyncHandler(async (req, res) => {
  const question = await qaService.setHidden(req.params.id, req.body.hidden);
  audit.recordFromReq(req, {
    action: req.body.hidden ? "qa.hide" : "qa.unhide",
    entityType: "question",
    entityId: req.params.id,
  });
  return ok(res, { question }, "Question updated");
});

const remove = asyncHandler(async (req, res) => {
  await qaService.remove(req.params.id);
  audit.recordFromReq(req, { action: "qa.delete", entityType: "question", entityId: req.params.id });
  return ok(res, null, "Question deleted");
});

module.exports = { list, listAll, ask, answer, setHidden, remove };
