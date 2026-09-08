// middleware/errorHandler.js
const AppError = require("../utils/appError");

// Helper: handle MongoDB duplicate key error (code 11000)
const handleDuplicateError = (err) => {
  const value = Object.values(err.keyValue || {})[0];
  const field = Object.keys(err.keyValue || {})[0];

  return new AppError(`Duplicate value for field "${field}": ${value}`, 409);
};

// Helper: handle Mongoose validation error
const handleValidationError = (err) => {
  const messages = Object.values(err.errors || {})
    .map((e) => e.message)
    .join("; ");
  return new AppError(`Validation error: ${messages}`, 400);
};

// Helper: handle JWT errors
const handleJWTError = (err) => {
  if (err.name === "TokenExpiredError") {
    return new AppError("Token has expired.", 401);
  }
  return new AppError("Invalid or expired token.", 401);
};

// Helper: handle Joi validation error (if you use Joi in routes)
const handleJoiError = (err) => {
  const messages = err.details.map((d) => d.message).join("; ");
  return new AppError(`Validation error: ${messages}`, 400);
};

// Global error-handling middleware
exports.errorHandler = (err, req, res, next) => {
  let error = err;

  // Log error for debugging (adjust for production as needed)
  console.error("Error:", err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error = handleDuplicateError(err);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    error = handleValidationError(err);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    error = handleJWTError(err);
  }

  // Joi validation error
  if (err.isJoi === true || err.constructor.name === "ValidationError") {
    error = handleJoiError(err);
  }

  // Ensure we always have an AppError
  if (!(error instanceof AppError)) {
    error = new AppError(
      err.message || "Internal server error",
      err.statusCode || 500,
    );
    error.stack = err.stack; // preserve original stack if available
  }

  const { statusCode, status, message } = error;

  return res.status(statusCode).json({
    success: false,
    status,
    message,
    // Optionally include stack in non-production
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};
