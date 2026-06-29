"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

const questionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true, trim: true, maxlength: 1000 },
    options: {
      type: [String],
      validate: [(v) => v.length >= 2 && v.length <= 8, "2–8 options required"],
    },
    correctIndex: { type: Number, required: true, min: 0 },
  },
  { _id: true, toJSON: { transform: idTransform } }
);

/** A quiz attached to a course (optionally a specific lesson). */
const quizSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
    lessonId: { type: String, default: "", trim: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: "", maxlength: 1000 },
    passingScore: { type: Number, default: 70, min: 0, max: 100 },
    questions: { type: [questionSchema], default: [] },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

module.exports = mongoose.model("Quiz", quizSchema);
