"use strict";

const express = require("express");
const ctrl = require("../controllers/coupon.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth);

// Any authenticated user can validate a code at checkout.
router.post("/validate", validate({ body: s.validateCouponBody }), ctrl.validate);

// Staff: coupon CRUD.
router.get("/", requirePermission(PERMISSIONS.MANAGE_COUPONS), ctrl.list);
router.post(
  "/",
  requirePermission(PERMISSIONS.MANAGE_COUPONS),
  validate({ body: s.createCouponBody }),
  ctrl.create
);
router.patch(
  "/:id",
  requirePermission(PERMISSIONS.MANAGE_COUPONS),
  validate({ params: s.idParams, body: s.updateCouponBody }),
  ctrl.update
);
router.delete(
  "/:id",
  requirePermission(PERMISSIONS.MANAGE_COUPONS),
  validate({ params: s.idParams }),
  ctrl.remove
);

module.exports = router;
