"use strict";

const express = require("express");
const ctrl = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requirePermission } = require("../middlewares/auth.middleware");
const { PERMISSIONS } = require("../config/constants");
const s = require("./schemas");

const router = express.Router();

// Current user's wishlist (self-service — any authenticated user).
router.get("/me/wishlist", requireAuth, ctrl.getWishlist);
router.post(
  "/me/wishlist/:courseId",
  requireAuth,
  validate({ params: s.wishlistParams }),
  ctrl.addToWishlist
);
router.delete(
  "/me/wishlist/:courseId",
  requireAuth,
  validate({ params: s.wishlistParams }),
  ctrl.removeFromWishlist
);

// Staff: list/search/filter users.
router.get(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_USERS),
  validate({ query: s.userListQuery }),
  ctrl.list
);

// Role changes require the dedicated manage_roles permission (super-admin).
router.patch(
  "/:id/role",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_ROLES),
  validate({ params: s.userIdParams, body: s.setRoleBody }),
  ctrl.setRole
);

// Ban/unban + password reset require manage_users.
router.patch(
  "/:id/status",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_USERS),
  validate({ params: s.userIdParams, body: s.setStatusBody }),
  ctrl.setStatus
);
router.post(
  "/:id/reset-password",
  requireAuth,
  requirePermission(PERMISSIONS.MANAGE_USERS),
  validate({ params: s.userIdParams }),
  ctrl.resetPassword
);

module.exports = router;
