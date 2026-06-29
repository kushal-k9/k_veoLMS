"use strict";

const express = require("express");
const ctrl = require("../controllers/course.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  requireAuth,
  optionalAuth,
  requireRole,
  requirePermission,
} = require("../middlewares/auth.middleware");
const { ROLES, PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

// Public catalog. optionalAuth lets staff see drafts/unpublished courses and
// bypass drip locks (non-staff get drip-locked lesson content hidden).
router.get("/", optionalAuth, validate({ query: s.courseListQuery }), ctrl.list);
router.get("/:id", optionalAuth, validate({ params: s.courseIdParams }), ctrl.getOne);

// Bulk publish/unpublish (declared before "/:id" so "bulk" isn't read as an id).
router.patch(
  "/bulk",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_COURSES),
  validate({ body: s.bulkStatusBody }),
  ctrl.bulkStatus
);

// Admin-only CRUD
router.post(
  "/",
  requireAuth,
  requireRole(ROLES.ADMIN),
  validate({ body: s.createCourseBody }),
  ctrl.create
);
router.patch(
  "/:id",
  requireAuth,
  requireRole(ROLES.ADMIN),
  validate({ params: s.courseIdParams, body: s.updateCourseBody }),
  ctrl.update
);
router.delete(
  "/:id",
  requireAuth,
  requireRole(ROLES.ADMIN),
  validate({ params: s.courseIdParams }),
  ctrl.remove
);

module.exports = router;
