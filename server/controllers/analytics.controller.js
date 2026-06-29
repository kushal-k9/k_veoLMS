"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/response");
const analytics = require("../services/analytics.service");

const VALID_RANGES = ["daily", "weekly", "monthly"];
function range(req) {
  const r = String(req.query.range || "daily");
  return VALID_RANGES.includes(r) ? r : "daily";
}

const overview = asyncHandler(async (req, res) => {
  const data = await analytics.overview();
  return ok(res, data, "Analytics overview");
});

const revenue = asyncHandler(async (req, res) => {
  const series = await analytics.revenueSeries(range(req));
  return ok(res, { series }, "Revenue series");
});

const enrollments = asyncHandler(async (req, res) => {
  const series = await analytics.enrollmentTrends(range(req));
  return ok(res, { series }, "Enrollment trends");
});

const topCourses = asyncHandler(async (req, res) => {
  const courses = await analytics.topCourses(5);
  return ok(res, { courses }, "Top courses");
});

const traffic = asyncHandler(async (req, res) => {
  const sources = await analytics.trafficSources();
  return ok(res, { sources }, "Traffic sources");
});

module.exports = { overview, revenue, enrollments, topCourses, traffic };
