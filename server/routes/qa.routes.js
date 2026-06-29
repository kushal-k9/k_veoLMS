"use strict";

const express = require("express");
const ctrl = require("../controllers/qa.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth);

// Admin moderation queue (declared before "/course/:courseId" param routes).
router.get("/admin/all", requirePermission(PERMISSIONS.MODERATE), ctrl.listAll);

// List a course's questions (optionally ?lessonId=...).
router.get("/course/:courseId", validate({ params: s.courseIdRouteParam }), ctrl.list);

// Ask + answer.
router.post("/", validate({ body: s.askQuestionBody }), ctrl.ask);
router.post("/:id/answers", validate({ params: s.idParams, body: s.answerBody }), ctrl.answer);

// Moderation.
router.patch(
  "/:id/hidden",
  requirePermission(PERMISSIONS.MODERATE),
  validate({ params: s.idParams, body: s.hiddenBody }),
  ctrl.setHidden
);
router.delete(
  "/:id",
  requirePermission(PERMISSIONS.MODERATE),
  validate({ params: s.idParams }),
  ctrl.remove
);

module.exports = router;
