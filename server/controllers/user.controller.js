"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const userService = require("../services/user.service");
const audit = require("../services/audit.service");

const list = asyncHandler(async (req, res) => {
  const users = await userService.list(req.query);
  return ok(res, { users }, "Users fetched");
});

const setRole = asyncHandler(async (req, res) => {
  const user = await userService.setRole(req.user.id, req.params.id, req.body.role);
  audit.recordFromReq(req, {
    action: "user.setRole",
    entityType: "user",
    entityId: user.id,
    metadata: { role: req.body.role },
  });
  return ok(res, { user }, "Role updated");
});

const setStatus = asyncHandler(async (req, res) => {
  const user = await userService.setStatus(req.user.id, req.params.id, req.body.status);
  audit.recordFromReq(req, {
    action: req.body.status === "banned" ? "user.ban" : "user.unban",
    entityType: "user",
    entityId: user.id,
  });
  return ok(res, { user }, "Status updated");
});

const resetPassword = asyncHandler(async (req, res) => {
  const tempPassword = await userService.resetPassword(req.params.id);
  audit.recordFromReq(req, {
    action: "user.resetPassword",
    entityType: "user",
    entityId: req.params.id,
  });
  return ok(res, { tempPassword }, "Temporary password generated");
});

const getWishlist = asyncHandler(async (req, res) => {
  const courses = await userService.getWishlist(req.user.id);
  return ok(res, { courses }, "Wishlist fetched");
});

const addToWishlist = asyncHandler(async (req, res) => {
  const courses = await userService.addToWishlist(req.user.id, req.params.courseId);
  return ok(res, { courses }, "Added to wishlist");
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const courses = await userService.removeFromWishlist(req.user.id, req.params.courseId);
  return ok(res, { courses }, "Removed from wishlist");
});

module.exports = {
  list,
  setRole,
  setStatus,
  resetPassword,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
