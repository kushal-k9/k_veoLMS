"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const auditService = require("../services/audit.service");

const list = asyncHandler(async (req, res) => {
  const { items, pagination } = await auditService.list(req.query);
  return ok(res, { logs: items, pagination }, "Audit log fetched");
});

module.exports = { list };
