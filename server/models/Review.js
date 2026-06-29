"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** A learner's rating + review of a course (one per user per course). */
const reviewSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    authorName: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    body: { type: String, default: "", trim: true, maxlength: 2000 },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
