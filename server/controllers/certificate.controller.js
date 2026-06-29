"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const certificateService = require("../services/certificate.service");
const ApiError = require("../utils/ApiError");

const listMine = asyncHandler(async (req, res) => {
  const certificates = await certificateService.listMine(req.user.id);
  return ok(res, { certificates }, "Certificates fetched");
});

const verify = asyncHandler(async (req, res) => {
  const certificate = await certificateService.getByCode(req.params.code);
  if (!certificate) throw ApiError.notFound("Certificate not found");
  return ok(res, { certificate }, "Certificate verified");
});

const listAll = asyncHandler(async (req, res) => {
  const certificates = await certificateService.listAll();
  return ok(res, { certificates }, "Certificates fetched");
});

module.exports = { listMine, verify, listAll };
