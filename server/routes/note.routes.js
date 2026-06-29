"use strict";

const express = require("express");
const ctrl = require("../controllers/note.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth } = require("../middlewares/auth.middleware");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth); // notes are always personal to the logged-in user

router.get("/:courseId", validate({ params: s.courseIdParam }), ctrl.listForCourse);
router.put(
  "/:courseId/:lessonId",
  validate({ params: s.noteParams, body: s.noteBody }),
  ctrl.upsert
);
router.delete(
  "/:courseId/:lessonId",
  validate({ params: s.noteParams }),
  ctrl.remove
);

module.exports = router;
