"use strict";

const express = require("express");
const ctrl = require("../controllers/payment.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

// Note: the Stripe webhook is mounted separately in app.js (it needs the raw
// request body for signature verification, before the JSON body parser runs).

router.post(
  "/create-intent",
  requireAuth,
  validate({ body: s.createIntentBody }),
  ctrl.createIntent
);
router.post(
  "/confirm",
  requireAuth,
  validate({ body: s.confirmBody }),
  ctrl.confirm
);

// Admin: transaction log + refunds.
router.get(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.VIEW_ANALYTICS, PERMISSIONS.ISSUE_REFUNDS),
  ctrl.list
);
router.post(
  "/:id/refund",
  requireAuth,
  requirePermission(PERMISSIONS.ISSUE_REFUNDS),
  validate({ params: s.paymentIdParams }),
  ctrl.refund
);

module.exports = router;
