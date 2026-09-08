// envValidation.js
const Joi = require("joi");
require("dotenv").config();

const envSchema = Joi.object({
  PORT: Joi.number()
    .integer()
    .min(1)
    .max(65535)
    .default(8080)
    .required()
    .messages({
      "number.base": "PORT must be a number.",
      "number.integer": "PORT must be an integer.",
      "number.min": "PORT must be at least 1.",
      "number.max": "PORT must be at most 65535.",
      "any.required": "PORT is required.",
    }),

  MONGO_URL: Joi.string().uri().required().messages({
    "string.base": "MONGO_URL must be a string.",
    "string.uri":
      "MONGO_URL must be a valid MongoDB URI (e.g., mongodb://localhost:27017/db).",
    "any.required": "MONGO_URL is required.",
  }),

  JWT_EXPIRE: Joi.string()
    .pattern(/^\d+[smhdwy]$/)
    .default("7d")
    .required()
    .messages({
      "string.base": "JWT_EXPIRE must be a string.",
      "string.pattern.base":
        "JWT_EXPIRE must be a number followed by s/m/h/d/w/y (e.g., 7d, 2h, 30m).",
      "any.required": "JWT_EXPIRE is required.",
    }),

  JWT_SECRET: Joi.string().min(32).required().messages({
    "string.base": "JWT_SECRET must be a string.",
    "string.min": "JWT_SECRET must be at least 32 characters for security.",
    "any.required": "JWT_SECRET is required.",
  }),
})
  .unknown(true)
  .messages({
    "object.unknown": "Unexpected environment variable found.",
  });

const { error, value } = envSchema.validate(process.env, {
  abortEarly: false,
  stripUnknown: true,
});
if (error) {
  const messages = error.details.map((d) => d.message).join(", ");
  console.error(`Invalid environment variables: ${messages}`);
}
module.exports = {
  SERVER: { PORT: value.PORT, URL: value.MONGO_URL },
  JWT: {
    JWT_EXPIRE: value.JWT_EXPIRE,
    JWT_SECRET: value.JWT_SECRET,
  },
};
