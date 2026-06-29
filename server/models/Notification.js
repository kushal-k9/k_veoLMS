"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** A per-user notification (announcement, Q&A reply, lesson drop, deadline…). */
const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: {
      type: String,
      enum: ["announcement", "qa_reply", "lesson", "deadline", "system"],
      default: "system",
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    body: { type: String, default: "", maxlength: 1000 },
    // Optional deep-link the client can navigate to.
    link: { type: String, default: "" },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
