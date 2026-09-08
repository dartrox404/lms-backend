// modules/student/student.validator.js
const Joi = require("joi");
const AppError = require("../utils/appError");

const createValidator = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.base": "User ID must be a string.",
        "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
        "any.required": "User ID is required.",
      }),

    name: Joi.string().min(2).max(50).required().messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must be at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Student name is required.",
    }),

    rollNumber: Joi.string()
      .pattern(/^[A-Z0-9-]+$/)
      .required()
      .messages({
        "string.base": "Roll number must be a string.",
        "string.pattern.base":
          "Roll number must contain only letters, numbers, and hyphens.",
        "any.required": "Roll number is required.",
      }),

    department: Joi.string()
      .valid("CS", "SE", "IT", "EE", "ME", "CE")
      .required()
      .messages({
        "string.base": "Department must be a string.",
        "any.only": "Department must be one of: CS, SE, IT, EE, ME, CE.",
        "any.required": "Department is required.",
      }),

    semester: Joi.number().integer().min(1).max(8).required().messages({
      "number.base": "Semester must be a number.",
      "number.min": "Semester must be at least 1.",
      "number.max": "Semester cannot exceed 8.",
      "any.required": "Semester is required.",
    }),

    cgpa: Joi.number().min(0).max(4).default(0).messages({
      "number.base": "CGPA must be a number.",
      "number.min": "CGPA cannot be less than 0.",
      "number.max": "CGPA cannot exceed 4.",
    }),
  });
};

const updateValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must be at least 2 characters.",
      "string.max": "Name cannot exceed 50 characters.",
    }),

    rollNumber: Joi.string()
      .pattern(/^[A-Z0-9-]+$/)
      .messages({
        "string.base": "Roll number must be a string.",
        "string.pattern.base":
          "Roll number must contain only letters, numbers, and hyphens.",
      }),

    department: Joi.string()
      .valid("CS", "SE", "IT", "EE", "ME", "CE")
      .messages({
        "string.base": "Department must be a string.",
        "any.only": "Department must be one of: CS, SE, IT, EE, ME, CE.",
      }),

    semester: Joi.number().integer().min(1).max(8).messages({
      "number.base": "Semester must be a number.",
      "number.min": "Semester must be at least 1.",
      "number.max": "Semester cannot exceed 8.",
    }),

    cgpa: Joi.number().min(0).max(4).messages({
      "number.base": "CGPA must be a number.",
      "number.min": "CGPA cannot be less than 0.",
      "number.max": "CGPA cannot exceed 4.",
    }),
  }).min(1); // at least one field to update
};

module.exports = {
  createValidator,
  updateValidator,
};
