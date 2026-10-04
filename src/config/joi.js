// config/validation.js
const Joi = require("joi");
require("dotenv").config();

const envSchema = Joi.object({
  // APP
  PORT: Joi.number().integer().min(1).max(65535).required().messages({
    "number.base": "PORT must be a number.",
    "number.min": "PORT must be at least 1.",
    "number.max": "PORT must be at most 65535.",
    "any.required": "PORT is required.",
  }),

  BASE_URL: Joi.string().uri().required().messages({
    "string.uri": "BASE_URL must be a valid URI (e.g. http://localhost:5050).",
    "any.required": "BASE_URL is required.",
  }),

  // DATABASE
  MONGO_URL: Joi.string()
    .pattern(/^mongodb(?:\+srv)?:\/\/.+$/)
    .required()
    .messages({
      "string.pattern.base":
        "MONGO_URL must be a valid MongoDB connection string (mongodb:// or mongodb+srv://).",
      "any.required": "MONGO_URL is required.",
    }),

  // AUTH & SECURITY
  JWT_SECRET: Joi.string().min(32).required().messages({
    "string.min": "JWT_SECRET must be at least 32 characters.",
    "any.required": "JWT_SECRET is required.",
  }),

  JWT_EXPIRE: Joi.string()
    .pattern(/^[0-9]+[smhdwy]$/)
    .required()
    .messages({
      "string.pattern.base":
        'JWT_EXPIRE must be a valid time span like "7d", "2h", "30m".',
      "any.required": "JWT_EXPIRE is required.",
    }),

  JWT_R_SECRET: Joi.string().min(32).required().messages({
    "string.min": "JWT_R_SECRET must be at least 32 characters.",
    "any.required": "JWT_R_SECRET is required.",
  }),

  JWT_R_EXPIRE: Joi.string()
    .pattern(/^[0-9]+[smhdwy]$/)
    .required()
    .messages({
      "string.pattern.base":
        'JWT_R_EXPIRE must be a valid time span like "10d", "2h".',
      "any.required": "JWT_R_EXPIRE is required.",
    }),

  SALT_ROUND: Joi.number().integer().min(8).max(15).required().messages({
    "number.base": "SALT_ROUND must be a number.",
    "number.min": "SALT_ROUND should be at least 8.",
    "number.max": "SALT_ROUND should be at most 15.",
    "any.required": "SALT_ROUND is required.",
  }),

  // RATE LIMIT
  RATE_LIMIT_WINDOW: Joi.number().integer().min(1000).required().messages({
    "number.base": "RATE_LIMIT_WINDOW must be a number (ms).",
    "number.min": "RATE_LIMIT_WINDOW must be at least 1000 ms.",
    "any.required": "RATE_LIMIT_WINDOW is required.",
  }),

  RATE_LIMIT_AUTH: Joi.number().integer().min(1).required().messages({
    "number.base": "RATE_LIMIT_AUTH must be a number.",
    "number.min": "RATE_LIMIT_AUTH must be at least 1.",
    "any.required": "RATE_LIMIT_AUTH is required.",
  }),

  RATE_LIMIT_LOCAL: Joi.number().integer().min(1).required().messages({
    "number.base": "RATE_LIMIT_LOCAL must be a number.",
    "number.min": "RATE_LIMIT_LOCAL must be at least 1.",
    "any.required": "RATE_LIMIT_LOCAL is required.",
  }),
});

const { value, error } = envSchema.validate(process.env, {
  abortEarly: false,
  stripUnknown: true,
});

if (error) {
  const messages = error.details.map((d) => d.message);
  return console.error(
    "Environment validation failed:\n" + messages.join("\n"),
  );
}

module.exports = {
  PORT: value.PORT,
  RATE_LIMIT_AUTH: value.RATE_LIMIT_AUTH,
  RATE_LIMIT_LOCAL: value.RATE_LIMIT_LOCAL,
  RATE_LIMIT_WINDOW: value.RATE_LIMIT_WINDOW,
  JWT_EXPIRE: value.JWT_EXPIRE,
  JWT_R_EXPIRE: value.JWT_R_EXPIRE,
  JWT_SECRET: value.JWT_SECRET,
  JWT_R_SECRET: value.JWT_R_SECRET,
  BASE_URL: value.BASE_URL,
  SALT_ROUND: value.SALT_ROUND,
  MONGO_URL: value.MONGO_URL,
};
