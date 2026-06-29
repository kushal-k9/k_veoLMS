"use strict";

const express = require("express");
const ctrl = require("../controllers/progress.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth } = require("../middlewares/auth.middleware");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth); // all progress routes require a logged-in user

router.get("/:courseId", validate({ params: s.courseIdParam }), ctrl.get);
router.patch(
  "/:courseId/lesson",
  validate({ params: s.courseIdParam, body: s.toggleLessonBody }),
  ctrl.toggleLesson
);
router.patch(
  "/:courseId/last-lesson",
  validate({ params: s.courseIdParam, body: s.lastLessonBody }),
  ctrl.setLastLesson
);

module.exports = router;
