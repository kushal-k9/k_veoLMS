"use strict";

const express = require("express");
const ctrl = require("../controllers/auth.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth } = require("../middlewares/auth.middleware");
const { authLimiter, otpLimiter } = require("../middlewares/rateLimit.middleware");
const { csrfProtection, generateCsrfToken } = require("../middlewares/csrf.middleware");
const s = require("./schemas");

const router = express.Router();

// Issue a CSRF token (sets the CSRF cookie). Needed before cookie-auth routes.
router.get("/csrf-token", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);
  res.json({ success: true, data: { csrfToken }, message: "OK" });
});

router.post("/register", authLimiter, validate({ body: s.registerBody }), ctrl.register);
router.post("/verify-otp", otpLimiter, validate({ body: s.verifyOtpBody }), ctrl.verifyOtp);
router.post("/resend-otp", otpLimiter, validate({ body: s.resendOtpBody }), ctrl.resendOtp);
router.post("/login", authLimiter, validate({ body: s.loginBody }), ctrl.login);
router.post("/google", authLimiter, validate({ body: s.googleBody }), ctrl.google);

// Cookie-authenticated, state-changing -> CSRF protected.
router.post("/refresh", csrfProtection, ctrl.refresh);
router.post("/logout", csrfProtection, ctrl.logout);

router.get("/me", requireAuth, ctrl.me);

module.exports = router;
