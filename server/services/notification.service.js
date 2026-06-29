"use strict";

const Notification = require("../models/Notification");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const logger = require("../utils/logger");

/** Create a single notification. */
async function notify(userId, { type, title, body, link }) {
  return Notification.create({ user: userId, type, title, body: body || "", link: link || "" });
}

/** Bulk-create the same notification for many users. */
async function notifyMany(userIds, payload) {
  if (!userIds.length) return;
  const docs = userIds.map((user) => ({
    user,
    type: payload.type,
    title: payload.title,
    body: payload.body || "",
    link: payload.link || "",
  }));
  await Notification.insertMany(docs);
}

/**
 * Fan an announcement out to its audience: enrolled students for course-scoped,
 * every student for platform-wide. Fire-and-forget — never throws.
 */
async function broadcastAnnouncement(announcement) {
  try {
    let userIds = [];
    if (announcement.scope === "course" && announcement.course) {
      const enrollments = await Enrollment.find({ course: announcement.course })
        .select("user")
        .lean();
      userIds = enrollments.map((e) => e.user);
    } else {
      const students = await User.find({ role: "student" }).select("_id").lean();
      userIds = students.map((u) => u._id);
    }
    await notifyMany(userIds, {
      type: "announcement",
      title: announcement.title,
      body: announcement.body,
      link: "/dashboard",
    });
  } catch (err) {
    logger.error("notification.broadcastAnnouncement failed", { error: err.message });
  }
}

async function listMine(userId, { unreadOnly = false } = {}) {
  const filter = { user: userId };
  if (unreadOnly) filter.read = false;
  return Notification.find(filter).sort({ createdAt: -1 }).limit(50);
}

async function unreadCount(userId) {
  return Notification.countDocuments({ user: userId, read: false });
}

async function markRead(userId, id) {
  return Notification.findOneAndUpdate({ _id: id, user: userId }, { read: true }, { new: true });
}

async function markAllRead(userId) {
  await Notification.updateMany({ user: userId, read: false }, { read: true });
}

module.exports = {
  notify,
  notifyMany,
  broadcastAnnouncement,
  listMine,
  unreadCount,
  markRead,
  markAllRead,
};
