"use strict";

const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");
const Progress = require("../models/Progress");
const { PAYMENT_STATUS, ROLES } = require("../config/constants");

/** Mongo date-format string for a given bucket granularity. */
function bucketFormat(range) {
  if (range === "monthly") return "%Y-%m";
  if (range === "weekly") return "%Y-%U"; // ISO-ish week
  return "%Y-%m-%d"; // daily
}

/** How far back to look by default, per granularity. */
function defaultSince(range) {
  const now = new Date();
  if (range === "monthly") return new Date(now.getFullYear(), now.getMonth() - 11, 1);
  if (range === "weekly") return new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);
  return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
}

/** Headline KPIs for the dashboard cards. */
async function overview() {
  const [revenueAgg, refundAgg, sales, refunds, totalStudents, totalCourses, activeStudentIds] =
    await Promise.all([
      Payment.aggregate([
        { $match: { status: PAYMENT_STATUS.SUCCEEDED } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Payment.aggregate([
        { $match: { status: PAYMENT_STATUS.REFUNDED } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Payment.countDocuments({ status: PAYMENT_STATUS.SUCCEEDED }),
      Payment.countDocuments({ status: PAYMENT_STATUS.REFUNDED }),
      User.countDocuments({ role: ROLES.STUDENT }),
      Course.countDocuments(),
      Progress.distinct("user"),
    ]);

  return {
    totalRevenue: revenueAgg[0]?.total || 0,
    refundedAmount: refundAgg[0]?.total || 0,
    totalSales: sales,
    refunds,
    totalStudents,
    totalCourses,
    activeStudents: activeStudentIds.length,
    inactiveStudents: Math.max(0, totalStudents - activeStudentIds.length),
  };
}

/** Revenue + sales count grouped into time buckets. */
async function revenueSeries(range = "daily") {
  const since = defaultSince(range);
  const rows = await Payment.aggregate([
    { $match: { status: PAYMENT_STATUS.SUCCEEDED, createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: bucketFormat(range), date: "$createdAt" } },
        revenue: { $sum: "$amount" },
        sales: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return rows.map((r) => ({ period: r._id, revenue: r.revenue, sales: r.sales }));
}

/** Enrollments over time (acquisition trend). */
async function enrollmentTrends(range = "daily") {
  const since = defaultSince(range);
  const rows = await Enrollment.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: bucketFormat(range), date: "$createdAt" } },
        enrollments: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return rows.map((r) => ({ period: r._id, enrollments: r.enrollments }));
}

/** Top courses by sales, with completion rate computed from progress. */
async function topCourses(limit = 5) {
  const bySales = await Enrollment.aggregate([
    { $group: { _id: "$course", sales: { $sum: 1 }, revenue: { $sum: "$amount" } } },
    { $sort: { sales: -1 } },
    { $limit: limit },
  ]);

  const courseIds = bySales.map((c) => c._id);
  const courses = await Course.find({ _id: mongoose.trusted({ $in: courseIds }) }).lean();
  const courseMap = new Map(courses.map((c) => [String(c._id), c]));

  // Completion rate = avg(completedLessons / totalLessons) across enrolled progress.
  const results = [];
  for (const row of bySales) {
    const course = courseMap.get(String(row._id));
    if (!course) continue;
    const totalLessons = (course.sections || []).reduce(
      (a, s) => a + (s.lessons?.length || 0),
      0,
    );
    let completionRate = 0;
    if (totalLessons > 0) {
      const progresses = await Progress.find({ course: row._id }).select("completedLessonIds").lean();
      if (progresses.length) {
        const avg =
          progresses.reduce((a, p) => a + (p.completedLessonIds?.length || 0) / totalLessons, 0) /
          progresses.length;
        completionRate = Math.round(avg * 100);
      }
    }
    results.push({
      id: String(course._id),
      title: course.title,
      thumbnail: course.thumbnail,
      sales: row.sales,
      revenue: row.revenue,
      completionRate,
    });
  }
  return results;
}

/** Traffic-source breakdown from enrollment acquisition channels. */
async function trafficSources() {
  const rows = await Enrollment.aggregate([
    { $group: { _id: "$source", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  return rows.map((r) => ({ source: r._id || "direct", count: r.count }));
}

module.exports = {
  overview,
  revenueSeries,
  enrollmentTrends,
  topCourses,
  trafficSources,
};
