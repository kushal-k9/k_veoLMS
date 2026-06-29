"use strict";

const express = require("express");
const ctrl = require("../controllers/analytics.controller");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");

const router = express.Router();

// All analytics endpoints require the view_analytics permission.
router.use(requireAuth, requirePermission(PERMISSIONS.VIEW_ANALYTICS));

router.get("/overview", ctrl.overview);
router.get("/revenue", ctrl.revenue);
router.get("/enrollments", ctrl.enrollments);
router.get("/top-courses", ctrl.topCourses);
router.get("/traffic", ctrl.traffic);

module.exports = router;
