"use strict";

/**
 * Zod-based request validation. Validates body/query/params against a schema,
 * strips unknown keys (schemas use `.strict()` to *reject* unknown fields where
 * desired), and replaces the request value with the parsed/coerced result.
 */
const { ZodError } = require("zod");
const ApiError = require("../utils/ApiError");

function formatZodError(err) {
  return err.issues.map((i) => ({
    field: i.path.join(".") || "(root)",
    message: i.message,
  }));
}

/**
 * @param {object} schemas - { body?, query?, params? } Zod schemas.
 */
function validate(schemas = {}) {
  return (req, _res, next) => {
    try {
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) {
        // req.query is a getter in some setups; assign parsed copy safely.
        const parsedQuery = schemas.query.parse(req.query);
        Object.keys(req.query).forEach((k) => delete req.query[k]);
        Object.assign(req.query, parsedQuery);
      }
      if (schemas.body) req.body = schemas.body.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(ApiError.badRequest("Validation failed", formatZodError(err)));
      }
      next(err);
    }
  };
}

module.exports = { validate };
