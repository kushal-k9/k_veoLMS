"use strict";

/**
 * Consistent JSON envelope used by every endpoint: { success, data, message }.
 */
function ok(res, data = null, message = "OK", status = 200) {
  return res.status(status).json({ success: true, data, message });
}

function created(res, data = null, message = "Created") {
  return ok(res, data, message, 201);
}

function fail(res, status, message, details) {
  const body = { success: false, data: null, message };
  if (details) body.errors = details;
  return res.status(status).json(body);
}

module.exports = { ok, created, fail };
