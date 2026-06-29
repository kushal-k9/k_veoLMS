"use strict";

const express = require("express");
const ctrl = require("../controllers/quiz.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth);

// Students: list quizzes for a course (answers stripped) + their attempts.
router.get(
  "/course/:courseId",
  validate({ params: s.courseIdRouteParam }),
  ctrl.listForCourse
);
router.get(
  "/course/:courseId/attempts/me",
  validate({ params: s.courseIdRouteParam }),
  ctrl.myAttempts
);
router.post("/:id/attempts", validate({ params: s.idParams, body: s.quizAttemptBody }), ctrl.submit);

// Staff: full quizzes + CRUD.
router.get(
  "/course/:courseId/admin",
  requirePermission(PERMISSIONS.MANAGE_COURSES),
  validate({ params: s.courseIdRouteParam }),
  ctrl.listForCourseAdmin
);
router.post(
  "/",
  requirePermission(PERMISSIONS.MANAGE_COURSES),
  validate({ body: s.createQuizBody }),
  ctrl.create
);
router.patch(
  "/:id",
  requirePermission(PERMISSIONS.MANAGE_COURSES),
  validate({ params: s.idParams, body: s.updateQuizBody }),
  ctrl.update
);
router.delete(
  "/:id",
  requirePermission(PERMISSIONS.MANAGE_COURSES),
  validate({ params: s.idParams }),
  ctrl.remove
);

module.exports = router;
