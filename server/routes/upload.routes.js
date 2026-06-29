"use strict";

const express = require("express");
const ctrl = require("../controllers/upload.controller");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { uploadAsset } = require("../middlewares/upload.middleware");
const { PERMISSIONS } = require("../config/constants");

const router = express.Router();

// Single-file course asset upload (image / pdf / video). Staff with course
// management permission only.
router.post(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_COURSES),
  uploadAsset.single("file"),
  ctrl.uploadAsset
);

module.exports = router;
