"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const settingService = require("../services/setting.service");
const audit = require("../services/audit.service");

const getAll = asyncHandler(async (req, res) => {
  const settings = await settingService.getAll();
  return ok(res, { settings }, "Settings fetched");
});

const update = asyncHandler(async (req, res) => {
  const settings = await settingService.setMany(req.body);
  audit.recordFromReq(req, {
    action: "settings.update",
    entityType: "setting",
    metadata: { keys: Object.keys(req.body) },
  });
  return ok(res, { settings }, "Settings updated");
});

module.exports = { getAll, update };
