"use strict";

const express = require("express");
const ctrl = require("../controllers/audit.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.VIEW_AUDIT),
  validate({ query: s.auditQuery }),
  ctrl.list
);

module.exports = router;
