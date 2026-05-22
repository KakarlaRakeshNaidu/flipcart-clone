// backend/src/middlewares/validate.js
// Zod-based request validation middleware factory
const { ZodError } = require('zod');

/**
 * Creates an Express middleware that validates the request body/params/query
 * against a Zod schema. Parsed (and Zod-coerced) data is stored on
 * req.validated[source] so it doesn't conflict with Express internals.
 *
 * Usage in controller: const data = req.validated.body || req.validated.query
 *
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 * @param {'body' | 'params' | 'query'} source - Which part of request to validate
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      // Zod parses AND coerces (e.g. '3' → 3, 'true' → true)
      const parsed = schema.parse(req[source]);

      // Store on req.validated to avoid overwriting Express-managed props
      if (!req.validated) req.validated = {};
      req.validated[source] = parsed;

      // Also overwrite body directly (body IS writable, and controllers expect it)
      if (source === 'body') {
        req.body = parsed;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
};

module.exports = validate;
