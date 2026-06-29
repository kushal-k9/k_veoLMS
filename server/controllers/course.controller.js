"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const courseService = require("../services/course.service");
const audit = require("../services/audit.service");
const { STAFF_ROLES } = require("../config/constants");

/** True when the (optionally-authed) caller is staff. */
function isStaff(req) {
  return Boolean(req.user && STAFF_ROLES.includes(req.user.role));
}

const list = asyncHandler(async (req, res) => {
  const { items, pagination } = await courseService.list({
    ...req.query,
    includeUnpublished: isStaff(req),
  });
  return ok(res, { courses: items, pagination }, "Courses fetched");
});

const getOne = asyncHandler(async (req, res) => {
  const course = await courseService.getById(req.params.id);
  // Staff see everything; everyone else has drip-locked lesson content hidden.
  const data = isStaff(req)
    ? course.toJSON()
    : courseService.applyDripVisibility(course.toJSON());
  return ok(res, { course: data }, "Course fetched");
});

const create = asyncHandler(async (req, res) => {
  const course = await courseService.create(req.body, req.user.id);
  audit.recordFromReq(req, {
    action: "course.create",
    entityType: "course",
    entityId: course.id,
    metadata: { title: course.title },
  });
  return created(res, { course }, "Course created");
});

const update = asyncHandler(async (req, res) => {
  const course = await courseService.update(req.params.id, req.body);
  audit.recordFromReq(req, {
    action: "course.update",
    entityType: "course",
    entityId: course.id,
    metadata: { fields: Object.keys(req.body) },
  });
  return ok(res, { course }, "Course updated");
});

const remove = asyncHandler(async (req, res) => {
  await courseService.remove(req.params.id);
  audit.recordFromReq(req, {
    action: "course.delete",
    entityType: "course",
    entityId: req.params.id,
  });
  return ok(res, null, "Course deleted");
});

const bulkStatus = asyncHandler(async (req, res) => {
  const { ids, status } = req.body;
  const result = await courseService.bulkSetStatus(ids, status);
  audit.recordFromReq(req, {
    action: "course.bulkStatus",
    entityType: "course",
    metadata: { status, count: ids.length },
  });
  return ok(res, result, `Updated ${result.modified} course(s)`);
});

module.exports = { list, getOne, create, update, remove, bulkStatus };
