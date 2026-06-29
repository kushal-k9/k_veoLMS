"use strict";

const express = require("express");
const ctrl = require("../controllers/setting.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth, requirePermission(PERMISSIONS.MANAGE_SETTINGS));

router.get("/", ctrl.getAll);
router.patch("/", validate({ body: s.settingsBody }), ctrl.update);

module.exports = router;
