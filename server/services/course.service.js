"use strict";

const mongoose = require("mongoose");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");
const ApiError = require("../utils/ApiError");

/** Escape user input before using it in a RegExp. */
function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Map the client's section/lesson shape onto Mongoose sub-documents. An
 * existing item carries its real ObjectId as `id`/`_id`, which we preserve so
 * lesson-keyed progress survives edits; new items get a fresh _id from Mongoose.
 */
function normalizeSections(sections = []) {
  return sections.map((section) => {
    const out = {
      title: section.title,
      lessons: (section.lessons || []).map((lesson) => {
        const l = {
          title: lesson.title,
          youtubeId: lesson.youtubeId || "",
          duration: lesson.duration || "00:00",
          preview: Boolean(lesson.preview),
          description: lesson.description || "",
          pdfUrl: lesson.pdfUrl || "",
          assets: Array.isArray(lesson.assets)
            ? lesson.assets.map((a) => ({ type: a.type, url: a.url, name: a.name || "" }))
            : [],
          availableAt: lesson.availableAt ? new Date(lesson.availableAt) : null,
        };
        const lid = lesson.id || lesson._id;
        if (mongoose.isValidObjectId(lid)) l._id = lid;
        return l;
      }),
    };
    const sid = section.id || section._id;
    if (mongoose.isValidObjectId(sid)) out._id = sid;
    return out;
  });
}

/**
 * Filter clause that hides drafts + not-yet-published courses from the public.
 * `mongoose.trusted()` marks the `$lte` operator as intentional so the global
 * `sanitizeFilter` setting doesn't neutralize it (treating it as a literal).
 */
function publishedFilter() {
  const now = new Date();
  return {
    status: "published",
    $or: [{ publishAt: null }, { publishAt: mongoose.trusted({ $lte: now }) }],
  };
}

/**
 * List courses with optional search (q), category filter, and pagination.
 * Returns a paginated envelope so the catalog can scale.
 */
async function list({ q, category, status, page = 1, limit = 24, includeUnpublished = false } = {}) {
  const clauses = [];
  if (category && category !== "All") clauses.push({ category });
  if (q && q.trim()) {
    const rx = new RegExp(escapeRegex(q.trim()), "i");
    clauses.push({ $or: [{ title: rx }, { instructor: rx }, { category: rx }] });
  }
  // Staff (admin) callers may see drafts and optionally filter by status.
  if (includeUnpublished) {
    if (status) clauses.push({ status });
  } else {
    clauses.push(publishedFilter());
  }
  const filter = clauses.length ? { $and: clauses } : {};

  const safeLimit = Math.min(Math.max(Number(limit) || 24, 1), 100);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Course.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
    Course.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit) || 1,
    },
  };
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) throw ApiError.notFound("Course not found");
  const course = await Course.findById(id);
  if (!course) throw ApiError.notFound("Course not found");
  return course;
}

async function create(data, userId) {
  const payload = { ...data, createdBy: userId || null };
  if (data.sections) payload.sections = normalizeSections(data.sections);
  const course = await Course.create(payload);
  return course;
}

async function update(id, data) {
  if (!mongoose.isValidObjectId(id)) throw ApiError.notFound("Course not found");
  const payload = { ...data };
  if (data.sections) payload.sections = normalizeSections(data.sections);
  const course = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!course) throw ApiError.notFound("Course not found");
  return course;
}

/** True when a lesson's drip date is in the future (not yet released). */
function isLessonDripLocked(lesson) {
  return Boolean(lesson.availableAt && new Date(lesson.availableAt).getTime() > Date.now());
}

/**
 * Hide drip-locked lesson content (video/pdf/assets) from a serialized course
 * for non-staff viewers. The lesson still appears (with `locked: true` and its
 * release date) so the UI can show "available on …".
 */
function applyDripVisibility(courseJson) {
  for (const section of courseJson.sections || []) {
    for (const lesson of section.lessons || []) {
      if (isLessonDripLocked(lesson)) {
        lesson.locked = true;
        lesson.youtubeId = "";
        lesson.pdfUrl = "";
        lesson.assets = [];
      }
    }
  }
  return courseJson;
}

async function remove(id) {
  if (!mongoose.isValidObjectId(id)) throw ApiError.notFound("Course not found");
  const course = await Course.findByIdAndDelete(id);
  if (!course) throw ApiError.notFound("Course not found");
  // Cascade: clean up dependent records so nothing dangles.
  await Promise.all([
    Enrollment.deleteMany({ course: id }),
    Progress.deleteMany({ course: id }),
  ]);
  return course;
}

/** Bulk publish/unpublish — sets the same status on many courses at once. */
async function bulkSetStatus(ids, status) {
  const valid = (ids || []).filter((id) => mongoose.isValidObjectId(id));
  const res = await Course.updateMany(
    { _id: mongoose.trusted({ $in: valid }) },
    { $set: { status } }
  );
  return { matched: res.matchedCount ?? res.n ?? 0, modified: res.modifiedCount ?? res.nModified ?? 0 };
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  bulkSetStatus,
  isLessonDripLocked,
  applyDripVisibility,
};
