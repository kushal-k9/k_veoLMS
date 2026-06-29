"use strict";

/**
 * Shared Zod request schemas. Top-level objects use `.strict()` to REJECT
 * unknown fields; nested course sub-documents strip unknown keys (e.g. stale
 * client ids) so the model stays authoritative.
 */
const { z } = require("zod");
const {
  COURSE_LEVELS,
  COURSE_STATUS_VALUES,
  ROLE_VALUES,
  USER_STATUS_VALUES,
} = require("../config/constants");

const email = z.string().trim().toLowerCase().email("Invalid email address");
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long");
const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");
const otpCode = z.string().trim().regex(/^\d{6}$/, "Code must be 6 digits");

// ---------- Auth ----------
const registerBody = z
  .object({
    name: z.string().trim().min(2, "Name is too short").max(80),
    email,
    password,
  })
  .strict();

const loginBody = z.object({ email, password: z.string().min(1) }).strict();
const verifyOtpBody = z.object({ email, code: otpCode }).strict();
const resendOtpBody = z.object({ email }).strict();
const googleBody = z.object({ credential: z.string().min(10) }).strict();

// ---------- Courses ----------
const lessonAssetInput = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  type: z.enum(["video", "pdf"]),
  url: z.string().trim().min(1).max(500),
  name: z.string().trim().max(200).optional().default(""),
});

const lessonInput = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  title: z.string().trim().min(1).max(160),
  youtubeId: z.string().trim().max(64).optional().default(""),
  duration: z.string().trim().max(12).optional().default("00:00"),
  preview: z.boolean().optional().default(false),
  description: z.string().max(2000).optional(),
  pdfUrl: z.string().trim().max(500).optional(),
  assets: z.array(lessonAssetInput).optional(),
  availableAt: z.string().datetime().nullable().optional(),
});

const sectionInput = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  title: z.string().trim().min(1).max(160),
  lessons: z.array(lessonInput).optional().default([]),
});

const courseFields = {
  title: z.string().trim().min(1, "Title is required").max(200),
  subtitle: z.string().trim().max(300).optional(),
  thumbnail: z.string().trim().optional(),
  trailerYoutubeId: z.string().trim().max(64).optional(),
  instructor: z.string().trim().max(120).optional(),
  instructorAvatar: z.string().trim().optional(),
  instructorTitle: z.string().trim().max(160).optional(),
  description: z.string().max(5000).optional(),
  price: z.coerce.number().min(0).optional(),
  discountPrice: z.coerce.number().min(0).nullable().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  ratingCount: z.coerce.number().min(0).optional(),
  studentsCount: z.coerce.number().min(0).optional(),
  level: z.enum(COURSE_LEVELS).optional(),
  category: z.string().trim().max(80).optional(),
  status: z.enum(COURSE_STATUS_VALUES).optional(),
  publishAt: z.string().datetime().nullable().optional(),
  sections: z.array(sectionInput).optional(),
};

const createCourseBody = z.object(courseFields).strict();
const updateCourseBody = z.object(courseFields).partial().strict();

const bulkStatusBody = z
  .object({
    ids: z.array(objectId).min(1, "Select at least one course").max(200),
    status: z.enum(COURSE_STATUS_VALUES),
  })
  .strict();

const courseListQuery = z
  .object({
    q: z.string().trim().max(120).optional(),
    category: z.string().trim().max(80).optional(),
    status: z.enum(COURSE_STATUS_VALUES).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
  })
  .strip();

const courseIdParams = z.object({ id: objectId });

// ---------- Progress ----------
const courseIdParam = z.object({ courseId: objectId });
const toggleLessonBody = z
  .object({ lessonId: z.string().trim().min(1).max(64), complete: z.boolean() })
  .strict();
const lastLessonBody = z
  .object({ lessonId: z.string().trim().min(1).max(64) })
  .strict();

// ---------- Notes ----------
const noteParams = z.object({
  courseId: objectId,
  lessonId: z.string().trim().min(1).max(64),
});
const noteBody = z.object({ content: z.string().max(10000).optional().default("") }).strict();

// ---------- Wishlist ----------
const wishlistParams = z.object({ courseId: objectId });

// ---------- Generic ----------
const idParams = z.object({ id: objectId });
const courseIdRouteParam = z.object({ courseId: objectId });

// ---------- Quizzes ----------
const quizQuestionInput = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  prompt: z.string().trim().min(1).max(1000),
  options: z.array(z.string().trim().min(1).max(300)).min(2).max(8),
  correctIndex: z.coerce.number().int().min(0),
});
const createQuizBody = z
  .object({
    course: objectId,
    lessonId: z.string().trim().max(64).optional().default(""),
    title: z.string().trim().min(1).max(200),
    description: z.string().max(1000).optional().default(""),
    passingScore: z.coerce.number().min(0).max(100).optional().default(70),
    questions: z.array(quizQuestionInput).optional().default([]),
  })
  .strict();
const updateQuizBody = createQuizBody.partial().strict();
const quizAttemptBody = z.object({ answers: z.array(z.coerce.number().int()) }).strict();

// ---------- Q&A ----------
const askQuestionBody = z
  .object({
    courseId: objectId,
    lessonId: z.string().trim().max(64).optional().default(""),
    body: z.string().trim().min(1).max(4000),
  })
  .strict();
const answerBody = z.object({ body: z.string().trim().min(1).max(4000) }).strict();
const hiddenBody = z.object({ hidden: z.boolean() }).strict();

// ---------- Announcements ----------
const createAnnouncementBody = z
  .object({
    scope: z.enum(["platform", "course"]),
    course: objectId.optional(),
    title: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(5000),
  })
  .strict();

// ---------- Certificates ----------
const certCodeParams = z.object({ code: z.string().trim().min(3).max(40) });

// ---------- Coupons ----------
const couponCode = z.string().trim().toUpperCase().min(3).max(32);
const createCouponBody = z
  .object({
    code: couponCode,
    type: z.enum(["percent", "flat"]),
    value: z.coerce.number().min(0),
    course: objectId.nullable().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
    usageLimit: z.coerce.number().int().min(0).optional().default(0),
    active: z.boolean().optional().default(true),
  })
  .strict();
const updateCouponBody = createCouponBody.partial().strict();
const validateCouponBody = z.object({ code: couponCode, courseId: objectId }).strict();

// ---------- Reviews ----------
const reviewBody = z
  .object({
    rating: z.coerce.number().int().min(1).max(5),
    body: z.string().trim().max(2000).optional().default(""),
  })
  .strict();

// ---------- Settings ----------
const settingsBody = z.record(z.string(), z.any());

// ---------- Audit ----------
const auditQuery = z
  .object({
    action: z.string().trim().max(64).optional(),
    entityType: z.string().trim().max(64).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(200).optional(),
  })
  .strip();

// ---------- Payments ----------
const createIntentBody = z
  .object({ courseId: objectId, couponCode: couponCode.optional() })
  .strict();
const confirmBody = z
  .object({ paymentIntentId: z.string().trim().min(5).max(120) })
  .strict();

// ---------- Users (admin) ----------
const userListQuery = z
  .object({
    role: z.enum(ROLE_VALUES).optional(),
    status: z.enum(USER_STATUS_VALUES).optional(),
    q: z.string().trim().max(120).optional(),
  })
  .strip();

const userIdParams = z.object({ id: objectId });
const setRoleBody = z.object({ role: z.enum(ROLE_VALUES) }).strict();
const setStatusBody = z.object({ status: z.enum(USER_STATUS_VALUES) }).strict();

// ---------- Admin enrollment / refunds ----------
const adminEnrollBody = z.object({ userId: objectId, courseId: objectId }).strict();
const adminUnenrollParams = z.object({ userId: objectId, courseId: objectId });
const paymentIdParams = z.object({ id: objectId });

module.exports = {
  registerBody,
  loginBody,
  verifyOtpBody,
  resendOtpBody,
  googleBody,
  createCourseBody,
  updateCourseBody,
  bulkStatusBody,
  courseListQuery,
  courseIdParams,
  courseIdParam,
  toggleLessonBody,
  lastLessonBody,
  noteParams,
  noteBody,
  wishlistParams,
  createIntentBody,
  confirmBody,
  userListQuery,
  userIdParams,
  setRoleBody,
  setStatusBody,
  adminEnrollBody,
  adminUnenrollParams,
  paymentIdParams,
  idParams,
  courseIdRouteParam,
  createQuizBody,
  updateQuizBody,
  quizAttemptBody,
  askQuestionBody,
  answerBody,
  hiddenBody,
  createAnnouncementBody,
  certCodeParams,
  createCouponBody,
  updateCouponBody,
  validateCouponBody,
  reviewBody,
  settingsBody,
  auditQuery,
};
