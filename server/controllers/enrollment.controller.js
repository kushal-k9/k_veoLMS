"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const enrollmentService = require("../services/enrollment.service");
const audit = require("../services/audit.service");

const listMine = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.listMine(req.user.id);
  return ok(res, { enrollments }, "Your enrollments");
});

const listAll = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.listAll();
  return ok(res, { enrollments }, "All enrollments");
});

const adminEnroll = asyncHandler(async (req, res) => {
  const enrollment = await enrollmentService.adminEnroll(req.body.userId, req.body.courseId);
  audit.recordFromReq(req, {
    action: "enrollment.adminEnroll",
    entityType: "enrollment",
    entityId: enrollment.id,
    metadata: { userId: req.body.userId, courseId: req.body.courseId },
  });
  return created(res, { enrollment }, "User enrolled");
});

const adminUnenroll = asyncHandler(async (req, res) => {
  await enrollmentService.adminUnenroll(req.params.userId, req.params.courseId);
  audit.recordFromReq(req, {
    action: "enrollment.adminUnenroll",
    entityType: "enrollment",
    metadata: { userId: req.params.userId, courseId: req.params.courseId },
  });
  return ok(res, null, "User unenrolled");
});

module.exports = { listMine, listAll, adminEnroll, adminUnenroll };
