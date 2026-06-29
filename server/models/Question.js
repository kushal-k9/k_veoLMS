"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

const answerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, default: "" },
    body: { type: String, required: true, trim: true, maxlength: 4000 },
    isInstructor: { type: Boolean, default: false },
  },
  { _id: true, timestamps: true, toJSON: { transform: idTransform } }
);

/** A Q&A thread anchored to a lesson within a course. */
const questionSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    lessonId: { type: String, default: "", trim: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    authorName: { type: String, default: "" },
    body: { type: String, required: true, trim: true, maxlength: 4000 },
    answers: { type: [answerSchema], default: [] },
    // Moderation: hidden questions are kept but excluded from student views.
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

module.exports = mongoose.model("Question", questionSchema);
