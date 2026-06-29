"use strict";

const express = require("express");
const ctrl = require("../controllers/announcement.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth);

// Announcements relevant to the current user.
router.get("/me", ctrl.listMine);

// Staff: list all, publish, delete.
router.get("/", requirePermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS), ctrl.listAll);
router.post(
  "/",
  requirePermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS),
  validate({ body: s.createAnnouncementBody }),
  ctrl.create
);
router.delete(
  "/:id",
  requirePermission(PERMISSIONS.MANAGE_ANNOUNCEMENTS),
  validate({ params: s.idParams }),
  ctrl.remove
);

module.exports = router;
