"use strict";

const mongoose = require("mongoose");

/** _id -> id transform shared across models. */
function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/**
 * Append-only audit trail: who did what, to which entity, when. Written by
 * `audit.service.record()` from mutating services/controllers.
 */
const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    actorEmail: { type: String, default: "", trim: true },
    actorRole: { type: String, default: "", trim: true },
    // e.g. "course.create", "user.ban", "coupon.delete"
    action: { type: String, required: true, trim: true, index: true },
    // The kind of entity affected, e.g. "course", "user", "coupon"
    entityType: { type: String, default: "", trim: true, index: true },
    entityId: { type: String, default: "", trim: true },
    // Free-form structured context (diff, reason, amount…). Capped on write.
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    ip: { type: String, default: "" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { transform: idTransform },
  }
);

auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
