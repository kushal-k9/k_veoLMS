"use strict";

/**
 * Secure file uploads (avatars / course thumbnails).
 * - Stored on disk in storage/uploads (outside any web root).
 * - Filenames randomized (never trust the client's name).
 * - MIME type + extension whitelisted; size capped.
 */
const os = require("os");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

// Serverless (Vercel) only allows writes under /tmp, and that storage is
// ephemeral per-invocation — uploads won't persist there, so use cloud storage
// (S3/Cloudinary) for real durability. We still point at /tmp so the app boots.
const isServerless = Boolean(process.env.VERCEL);
const UPLOAD_DIR = isServerless
  ? path.join(os.tmpdir(), "uploads")
  : path.resolve(__dirname, "..", "storage", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = ALLOWED.get(file.mimetype) || "";
    const name = `${Date.now()}-${crypto.randomBytes(12).toString("hex")}${ext}`;
    cb(null, name);
  },
});

function fileFilter(_req, file, cb) {
  if (!ALLOWED.has(file.mimetype)) {
    return cb(ApiError.badRequest("Only JPG, PNG, WEBP, or GIF images are allowed"));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.UPLOAD_MAX_BYTES, files: 1 },
});

// --- Course assets: images + PDF + video (larger cap). ---
const ALLOWED_ASSETS = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["application/pdf", ".pdf"],
  ["video/mp4", ".mp4"],
  ["video/webm", ".webm"],
  ["video/quicktime", ".mov"],
]);

const assetStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = ALLOWED_ASSETS.get(file.mimetype) || "";
    const name = `${Date.now()}-${crypto.randomBytes(12).toString("hex")}${ext}`;
    cb(null, name);
  },
});

function assetFilter(_req, file, cb) {
  if (!ALLOWED_ASSETS.has(file.mimetype)) {
    return cb(ApiError.badRequest("Only images, PDFs, or MP4/WEBM/MOV videos are allowed"));
  }
  cb(null, true);
}

// Allow large video uploads (cap at 200MB or env override).
const ASSET_MAX_BYTES = Number(env.UPLOAD_ASSET_MAX_BYTES) || 200 * 1024 * 1024;

const uploadAsset = multer({
  storage: assetStorage,
  fileFilter: assetFilter,
  limits: { fileSize: ASSET_MAX_BYTES, files: 1 },
});

/** Map a stored mimetype to our asset "type" bucket. */
function assetTypeFor(mimetype) {
  if (mimetype === "application/pdf") return "pdf";
  if (mimetype.startsWith("video/")) return "video";
  return "image";
}

module.exports = { upload, uploadAsset, assetTypeFor, UPLOAD_DIR };
