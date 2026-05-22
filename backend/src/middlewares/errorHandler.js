// backend/src/middlewares/errorHandler.js
// Centralized error handling middleware

/**
 * Express error handling middleware.
 * Normalizes all errors into a consistent JSON response format.
 * In development mode, includes the full stack trace.
 */
const errorHandler = (error, req, res, next) => {
  // Log the error for server-side debugging
  console.error(`[ERROR] ${req.method} ${req.path}:`, error.message);
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack);
  }

  // Prisma-specific error handling
  if (error.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'A record with this data already exists.',
      field: error.meta?.target,
    });
  }

  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'The requested record was not found.',
    });
  }

  // Zod validation errors are thrown with status 400
  if (error.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Generic fallback
  const statusCode = error.status || error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

module.exports = errorHandler;
