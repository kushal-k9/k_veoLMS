"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const notificationService = require("../services/notification.service");

const list = asyncHandler(async (req, res) => {
  const notifications = await notificationService.listMine(req.user.id, {
    unreadOnly: req.query.unread === "true",
  });
  const unread = await notificationService.unreadCount(req.user.id);
  return ok(res, { notifications, unread }, "Notifications fetched");
});

const markRead = asyncHandler(async (req, res) => {
  await notificationService.markRead(req.user.id, req.params.id);
  return ok(res, null, "Marked read");
});

const markAllRead = asyncHandler(async (req, res) => {
  await notificationService.markAllRead(req.user.id);
  return ok(res, null, "All marked read");
});

module.exports = { list, markRead, markAllRead };
