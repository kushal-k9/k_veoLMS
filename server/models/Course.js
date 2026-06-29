"use strict";

const mongoose = require("mongoose");
const {
  COURSE_LEVELS,
  COURSE_STATUS,
  COURSE_STATUS_VALUES,
} = require("../config/constants");

/** Recursive _id -> id transform shared by sub-documents. */
function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

const lessonAssetSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["video", "pdf"], required: true },
    url: { type: String, required: true, trim: true },
    name: { type: String, default: "", trim: true, maxlength: 200 },
  },
  { _id: true, toJSON: { transform: idTransform } }
);

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    youtubeId: { type: String, default: "", trim: true, maxlength: 64 },
    duration: { type: String, default: "00:00", trim: true }, // "mm:ss"
    preview: { type: Boolean, default: false },
    description: { type: String, default: "", maxlength: 2000 },
    pdfUrl: { type: String, default: "", trim: true },
    assets: { type: [lessonAssetSchema], default: [] },
    // Drip release: when set, the lesson unlocks only at/after this date.
    availableAt: { type: Date, default: null },
  },
  { _id: true, toJSON: { transform: idTransform } }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    lessons: { type: [lessonSchema], default: [] },
  },
  { _id: true, toJSON: { transform: idTransform } }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200, index: true },
    subtitle: { type: String, default: "", trim: true, maxlength: 300 },
    thumbnail: { type: String, default: "" },
    trailerYoutubeId: { type: String, default: "", trim: true },
    instructor: { type: String, default: "", trim: true, index: true },
    instructorAvatar: { type: String, default: "" },
    instructorTitle: { type: String, default: "" },
    description: { type: String, default: "", maxlength: 5000 },
    price: { type: Number, default: 0, min: 0 },
    discountPrice: { type: Number, default: null, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    studentsCount: { type: Number, default: 0, min: 0 },
    level: { type: String, enum: COURSE_LEVELS, default: "Beginner" },
    category: { type: String, default: "General", trim: true, index: true },
    // Publishing workflow: drafts are hidden from the public catalog. A future
    // `publishAt` schedules the course to go live automatically.
    status: {
      type: String,
      enum: COURSE_STATUS_VALUES,
      default: COURSE_STATUS.PUBLISHED,
      index: true,
    },
    publishAt: { type: Date, default: null },
    sections: { type: [sectionSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    toJSON: { transform: idTransform },
  }
);

// Text index powers the catalog search (title / instructor / category).
courseSchema.index({ title: "text", instructor: "text", category: "text" });

module.exports = mongoose.model("Course", courseSchema);
