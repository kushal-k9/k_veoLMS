"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** A student's graded attempt at a quiz. */
const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    answers: { type: [Number], default: [] }, // chosen option index per question
    score: { type: Number, required: true, min: 0, max: 100 },
    passed: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
