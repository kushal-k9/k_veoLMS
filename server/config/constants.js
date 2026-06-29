"use strict";

/** Shared, immutable app constants. */

const ROLES = Object.freeze({
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  SUPPORT: "support",
  STUDENT: "student",
});

const ROLE_VALUES = Object.freeze(Object.values(ROLES));

/** Staff roles can reach the admin area (subject to per-action permissions). */
const STAFF_ROLES = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.INSTRUCTOR,
  ROLES.SUPPORT,
]);

/** Granular permissions checked by `requirePermission`. */
const PERMISSIONS = Object.freeze({
  MANAGE_COURSES: "manage_courses",
  MANAGE_USERS: "manage_users",
  MANAGE_ROLES: "manage_roles",
  MANAGE_COUPONS: "manage_coupons",
  MANAGE_SETTINGS: "manage_settings",
  MANAGE_ANNOUNCEMENTS: "manage_announcements",
  VIEW_ANALYTICS: "view_analytics",
  VIEW_AUDIT: "view_audit",
  ISSUE_REFUNDS: "issue_refunds",
  GRADE: "grade",
  MODERATE: "moderate",
});

const ALL_PERMISSIONS = Object.freeze(Object.values(PERMISSIONS));

/** Role → permissions matrix. Super-admin holds everything. */
const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.SUPER_ADMIN]: ALL_PERMISSIONS,
  [ROLES.ADMIN]: Object.freeze([
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_COUPONS,
    PERMISSIONS.MANAGE_ANNOUNCEMENTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_AUDIT,
    PERMISSIONS.ISSUE_REFUNDS,
    PERMISSIONS.GRADE,
    PERMISSIONS.MODERATE,
  ]),
  [ROLES.INSTRUCTOR]: Object.freeze([
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.MANAGE_ANNOUNCEMENTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.GRADE,
    PERMISSIONS.MODERATE,
  ]),
  [ROLES.SUPPORT]: Object.freeze([
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MODERATE,
    PERMISSIONS.VIEW_ANALYTICS,
  ]),
  [ROLES.STUDENT]: Object.freeze([]),
});

/** Account status (banning). */
const USER_STATUS = Object.freeze({
  ACTIVE: "active",
  BANNED: "banned",
});

const USER_STATUS_VALUES = Object.freeze(Object.values(USER_STATUS));

const COURSE_LEVELS = Object.freeze([
  "Beginner",
  "Intermediate",
  "Advanced",
]);

const COURSE_STATUS = Object.freeze({
  DRAFT: "draft",
  PUBLISHED: "published",
});

const COURSE_STATUS_VALUES = Object.freeze(Object.values(COURSE_STATUS));

const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  REFUNDED: "refunded",
});

const AUTH_PROVIDER = Object.freeze({
  LOCAL: "local",
  GOOGLE: "google",
});

// Auth hardening
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_LENGTH = 6;

// Refresh-token cookie name
const REFRESH_COOKIE = "veolms_rt";

module.exports = {
  ROLES,
  ROLE_VALUES,
  STAFF_ROLES,
  PERMISSIONS,
  ALL_PERMISSIONS,
  ROLE_PERMISSIONS,
  USER_STATUS,
  USER_STATUS_VALUES,
  COURSE_LEVELS,
  COURSE_STATUS,
  COURSE_STATUS_VALUES,
  PAYMENT_STATUS,
  AUTH_PROVIDER,
  MAX_LOGIN_ATTEMPTS,
  LOCK_DURATION_MS,
  OTP_TTL_MS,
  OTP_LENGTH,
  REFRESH_COOKIE,
};
