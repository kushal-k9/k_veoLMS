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
 * A learner's personal note for a single lesson. One note per
 * (user, course, lesson) — upserted as the learner edits.
 */
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    lessonId: { type: String, required: true, trim: true },
    content: { type: String, default: "", maxlength: 10000 },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

noteSchema.index({ user: 1, course: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model("Note", noteSchema);
