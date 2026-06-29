"use strict";

const mongoose = require("mongoose");
const AuditLog = require("../models/AuditLog");
const logger = require("../utils/logger");

/**
 * Record an audit entry. Never throws — auditing must not break the primary
 * operation, so failures are logged and swallowed.
 *
 * @param {object} params
 * @param {{id?:string,email?:string,role?:string}} [params.actor] - req.user
 * @param {string} params.action - dot-namespaced, e.g. "course.update"
 * @param {string} [params.entityType]
 * @param {string} [params.entityId]
 * @param {object} [params.metadata]
 * @param {string} [params.ip]
 */
async function record({ actor, action, entityType, entityId, metadata, ip } = {}) {
  try {
    await AuditLog.create({
      actor:
        actor && mongoose.isValidObjectId(actor.id) ? actor.id : null,
      actorEmail: actor?.email || "",
      actorRole: actor?.role || "",
      action,
      entityType: entityType || "",
      entityId: entityId ? String(entityId) : "",
      metadata: metadata || {},
      ip: ip || "",
    });
  } catch (err) {
    logger.error("audit.record failed", { action, error: err.message });
  }
}

/** Express-friendly variant: pulls actor + ip from the request. */
function recordFromReq(req, { action, entityType, entityId, metadata } = {}) {
  return record({
    actor: req.user,
    action,
    entityType,
    entityId,
    metadata,
    ip: req.ip,
  });
}

/** List audit entries (admin viewer) with simple filtering + pagination. */
async function list({ action, entityType, page = 1, limit = 50 } = {}) {
  const filter = {};
  if (action) filter.action = action;
  if (entityType) filter.entityType = entityType;

  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    AuditLog.find(filter)
      .populate("actor", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    AuditLog.countDocuments(filter),
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

module.exports = { record, recordFromReq, list };
