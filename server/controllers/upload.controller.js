"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { created } = require("../utils/response");
const ApiError = require("../utils/ApiError");
const { assetTypeFor } = require("../middlewares/upload.middleware");

/**
 * Handle a single uploaded course asset (image/pdf/video). The file is already
 * stored on disk by multer; we return its public URL + detected type.
 */
const uploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest("No file uploaded");
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  return created(
    res,
    {
      url,
      filename: req.file.filename,
      type: assetTypeFor(req.file.mimetype),
      size: req.file.size,
      name: req.file.originalname,
    },
    "File uploaded"
  );
});

module.exports = { uploadAsset };
