"use strict";

const express = require("express");
const ctrl = require("../controllers/enrollment.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  requireAuth,
  requireRole,
  requirePermission,
} = require("../middlewares/auth.middleware");
const { ROLES, PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.get("/me", requireAuth, ctrl.listMine);
router.get("/", requireAuth, requireRole(ROLES.ADMIN), ctrl.listAll);

// Admin: manual enroll / unenroll.
router.post(
  "/admin",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_USERS),
  validate({ body: s.adminEnrollBody }),
  ctrl.adminEnroll
);
router.delete(
  "/admin/:userId/:courseId",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_USERS),
  validate({ params: s.adminUnenrollParams }),
  ctrl.adminUnenroll
);

module.exports = router;
