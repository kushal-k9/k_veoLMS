"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const announcementService = require("../services/announcement.service");
const notificationService = require("../services/notification.service");
const audit = require("../services/audit.service");

const listMine = asyncHandler(async (req, res) => {
  const announcements = await announcementService.listForUser(req.user.id);
  return ok(res, { announcements }, "Announcements fetched");
});

const listAll = asyncHandler(async (req, res) => {
  const announcements = await announcementService.listAll();
  return ok(res, { announcements }, "Announcements fetched");
});

const create = asyncHandler(async (req, res) => {
  const announcement = await announcementService.create(req.user.id, req.user.doc?.name || "", req.body);
  // Fan out notifications to the relevant audience (fire-and-forget).
  notificationService.broadcastAnnouncement(announcement);
  audit.recordFromReq(req, {
    action: "announcement.create",
    entityType: "announcement",
    entityId: announcement.id,
    metadata: { scope: announcement.scope },
  });
  return created(res, { announcement }, "Announcement published");
});

const remove = asyncHandler(async (req, res) => {
  await announcementService.remove(req.params.id);
  audit.recordFromReq(req, {
    action: "announcement.delete",
    entityType: "announcement",
    entityId: req.params.id,
  });
  return ok(res, null, "Announcement deleted");
});

module.exports = { listMine, listAll, create, remove };
