// modules/student/student.validator.js
const Joi = require("joi");

const createValidator = Joi.object({
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

const updateValidator = Joi.object({
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

  department: Joi.string().valid("CS", "SE", "IT", "EE", "ME", "CE").messages({
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

const getStudentsQueryValidator = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number.",
    "number.integer": "Page must be an integer.",
    "number.min": "Page must be at least 1.",
  }),

  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number.",
    "number.integer": "Limit must be an integer.",
    "number.min": "Limit must be at least 1.",
    "number.max": "Limit cannot exceed 100.",
  }),

  department: Joi.string()
    .valid("CS", "SE", "IT", "EE", "ME", "CE")
    .uppercase()
    .messages({
      "string.base": "Department must be a string.",
      "any.only": "Department must be one of: CS, SE, IT, EE, ME, CE.",
    }),

  semester: Joi.number().integer().min(1).max(8).messages({
    "number.base": "Semester must be a number.",
    "number.integer": "Semester must be an integer.",
    "number.min": "Semester must be at least 1.",
    "number.max": "Semester cannot exceed 8.",
  }),

  minCgpa: Joi.number().min(0).max(4).messages({
    "number.base": "minCgpa must be a number.",
    "number.min": "minCgpa cannot be less than 0.",
    "number.max": "minCgpa cannot exceed 4.",
  }),

  maxCgpa: Joi.number().min(0).max(4).messages({
    "number.base": "maxCgpa must be a number.",
    "number.min": "maxCgpa cannot be less than 0.",
    "number.max": "maxCgpa cannot exceed 4.",
  }),

  search: Joi.string().trim().min(1).max(50).messages({
    "string.base": "Search must be a string.",
    "string.empty": "Search cannot be empty.",
    "string.max": "Search cannot exceed 50 characters.",
  }),

  sortBy: Joi.string()
    .valid("createdAt", "name", "rollNumber", "department", "semester", "cgpa")
    .default("createdAt")
    .messages({
      "string.base": "sortBy must be a string.",
      "any.only":
        "sortBy must be one of: createdAt, name, rollNumber, department, semester, cgpa.",
    }),

  sortOrder: Joi.string().valid("asc", "desc").default("desc").messages({
    "string.base": "sortOrder must be a string.",
    "any.only": "sortOrder must be either asc or desc.",
  }),
});

module.exports = {
  createValidator,
  updateValidator,
  getStudentsQueryValidator,
};
