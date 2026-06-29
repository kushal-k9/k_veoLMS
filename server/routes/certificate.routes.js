"use strict";

const express = require("express");
const ctrl = require("../controllers/certificate.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

// Public verification by code.
router.get("/verify/:code", validate({ params: s.certCodeParams }), ctrl.verify);

// Current user's certificates.
router.get("/me", requireAuth, ctrl.listMine);

// Admin: all issued certificates.
router.get(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.VIEW_ANALYTICS),
  ctrl.listAll
);

module.exports = router;
