"use strict";

const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema(
  {
    lessonId: { type: String, required: true },
    courseId: { type: String, required: true },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
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
    // Lesson sub-document ids (stored as strings) the user has completed.
    completedLessonIds: { type: [String], default: [] },
    lastLessonId: { type: String, default: null },
    recentlyWatched: { type: [recentSchema], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
