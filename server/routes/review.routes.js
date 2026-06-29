"use strict";

const express = require("express");
const ctrl = require("../controllers/review.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  requireAuth,
  optionalAuth,
  requirePermission,
} = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

// Admin moderation queue (before param routes).
router.get("/admin/all", requireAuth, requirePermission(PERMISSIONS.MODERATE), ctrl.listAll);

// Public: a course's reviews.
router.get("/course/:courseId", optionalAuth, validate({ params: s.courseIdRouteParam }), ctrl.listForCourse);

// The current user's review for a course.
router.get("/course/:courseId/me", requireAuth, validate({ params: s.courseIdRouteParam }), ctrl.getMine);

// Create/update the caller's review (must be enrolled).
router.put(
  "/course/:courseId",
  requireAuth,
  validate({ params: s.courseIdRouteParam, body: s.reviewBody }),
  ctrl.upsert
);

// Moderation.
router.patch(
  "/:id/hidden",
  requireAuth,
  requirePermission(PERMISSIONS.MODERATE),
  validate({ params: s.idParams, body: s.hiddenBody }),
  ctrl.setHidden
);
router.delete(
  "/:id",
  requireAuth,
  requirePermission(PERMISSIONS.MODERATE),
  validate({ params: s.idParams }),
  ctrl.remove
);

module.exports = router;
