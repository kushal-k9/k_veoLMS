"use strict";

const mongoose = require("mongoose");

function idTransform(_doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

/** A platform-wide or course-scoped announcement from staff. */
const announcementSchema = new mongoose.Schema(
  {
    scope: { type: String, enum: ["platform", "course"], default: "platform", index: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    authorName: { type: String, default: "" },
  },
  { timestamps: true, toJSON: { transform: idTransform } }
);

module.exports = mongoose.model("Announcement", announcementSchema);
