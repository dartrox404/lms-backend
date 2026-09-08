// modules/user/user.validator.js
const Joi = require("joi");

const registerValidator = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name must be a string.",
    "string.min": "Name must be at least 2 characters.",
    "string.max": "Name cannot exceed 50 characters.",
    "any.required": "Name is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Please provide a valid email.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least 6 characters.",
    "any.required": "Password is required.",
  }),

  role: Joi.string().valid("user", "admin").default("user").messages({
    "string.base": "Role must be a string.",
    "any.only": "Role must be one of: user, admin.",
  }),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Please provide a valid email.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "any.required": "Password is required.",
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
};
