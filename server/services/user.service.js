"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/ApiError");
const { ROLES, ROLE_VALUES, USER_STATUS, USER_STATUS_VALUES } = require("../config/constants");

function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * List users (admin). Supports role/status filters + a free-text search on
 * name/email, and returns each user's enrollment count for the admin table.
 */
async function list({ role, status, q } = {}) {
  const filter = {};
  if (role) filter.role = role;
  if (status) filter.status = status;
  if (q && q.trim()) {
    const rx = new RegExp(escapeRegex(q.trim()), "i");
    filter.$or = [{ name: rx }, { email: rx }];
  }
  const users = await User.find(filter).sort({ createdAt: -1 }).lean({ virtuals: true });

  // Attach enrollment counts in one aggregate pass.
  const counts = await Enrollment.aggregate([
    { $group: { _id: "$user", count: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

  return users.map((u) => ({
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status || USER_STATUS.ACTIVE,
    avatar: u.avatar,
    isEmailVerified: u.isEmailVerified,
    enrolledCount: countMap.get(String(u._id)) || 0,
    createdAt: u.createdAt,
  }));
}

/** Change a user's role (super-admin only at the route level). */
async function setRole(actorId, userId, role) {
  if (!ROLE_VALUES.includes(role)) throw ApiError.badRequest("Invalid role");
  if (String(actorId) === String(userId)) {
    throw ApiError.badRequest("You can't change your own role");
  }
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

/** Ban / unban a user. Banned users are blocked at login. */
async function setStatus(actorId, userId, status) {
  if (!USER_STATUS_VALUES.includes(status)) throw ApiError.badRequest("Invalid status");
  if (String(actorId) === String(userId)) {
    throw ApiError.badRequest("You can't change your own status");
  }
  const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

/**
 * Admin-triggered password reset: sets a strong temporary password and returns
 * it so the admin can share it out-of-band. (In production, email it instead.)
 */
async function resetPassword(userId) {
  const user = await User.findById(userId).select("+password");
  if (!user) throw ApiError.notFound("User not found");
  const temp = `Temp-${crypto.randomBytes(4).toString("hex")}A1`;
  user.password = temp; // hashed by the pre-save hook
  await user.save();
  return temp;
}

async function listStudents() {
  return list({ role: ROLES.STUDENT });
}

// ---------- Wishlist ----------

/** Return the user's wishlist as populated Course documents. */
async function getWishlist(userId) {
  const user = await User.findById(userId).populate("wishlist");
  if (!user) throw ApiError.notFound("User not found");
  return user.wishlist;
}

/** Add a course to the wishlist (idempotent via $addToSet). */
async function addToWishlist(userId, courseId) {
  if (!mongoose.isValidObjectId(courseId)) throw ApiError.notFound("Course not found");
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { wishlist: courseId } },
    { new: true }
  ).populate("wishlist");
  return user.wishlist;
}

/** Remove a course from the wishlist. */
async function removeFromWishlist(userId, courseId) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { wishlist: courseId } },
    { new: true }
  ).populate("wishlist");
  return user.wishlist;
}

module.exports = {
  list,
  listStudents,
  setRole,
  setStatus,
  resetPassword,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
