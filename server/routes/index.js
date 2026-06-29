"use strict";

const express = require("express");
const env = require("../config/env");

const authRoutes = require("./auth.routes");
const courseRoutes = require("./course.routes");
const enrollmentRoutes = require("./enrollment.routes");
const progressRoutes = require("./progress.routes");
const noteRoutes = require("./note.routes");
const paymentRoutes = require("./payment.routes");
const userRoutes = require("./user.routes");
const uploadRoutes = require("./upload.routes");
const analyticsRoutes = require("./analytics.routes");
const quizRoutes = require("./quiz.routes");
const certificateRoutes = require("./certificate.routes");
const qaRoutes = require("./qa.routes");
const announcementRoutes = require("./announcement.routes");
const notificationRoutes = require("./notification.routes");
const couponRoutes = require("./coupon.routes");
const reviewRoutes = require("./review.routes");
const settingRoutes = require("./setting.routes");
const auditRoutes = require("./audit.routes");

const router = express.Router();

router.get("/health", (_req, res) =>
  res.json({
    success: true,
    data: { status: "ok", env: env.NODE_ENV, uptime: process.uptime() },
    message: "VeoLMS API is healthy",
  })
);

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/progress", progressRoutes);
router.use("/notes", noteRoutes);
router.use("/payments", paymentRoutes);
router.use("/users", userRoutes);
router.use("/uploads", uploadRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/quizzes", quizRoutes);
router.use("/certificates", certificateRoutes);
router.use("/qa", qaRoutes);
router.use("/announcements", announcementRoutes);
router.use("/notifications", notificationRoutes);
router.use("/coupons", couponRoutes);
router.use("/reviews", reviewRoutes);
router.use("/settings", settingRoutes);
router.use("/audit", auditRoutes);

module.exports = router;
