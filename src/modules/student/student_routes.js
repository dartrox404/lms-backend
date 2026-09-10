// src/modules/student/student_routes.js
const express = require("express");
const router = express.Router();

const {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} = require("./student_controller");

const { protect } = require("../../middleware/auth");
const rateLimit = require("../../middleware/rateLimiter");
const { globalValidate } = require("../../middleware/validate");
const { restrictTo } = require("../../middleware/restrictRole");

const {
  createValidator,
  updateValidator,
  getStudentsQueryValidator,
} = require("../../validator/student_validator");

// Protect all student routes
router.use(protect, rateLimit.localRateLimit);

router
  .route("/")
  .get(globalValidate(getStudentsQueryValidator), getAllStudents)
  .post(restrictTo("admin"), globalValidate(createValidator), createStudent);

router
  .route("/:id")
  .get(getStudentById)
  .patch(restrictTo("admin"), globalValidate(updateValidator), updateStudent)
  .delete(restrictTo("admin"), deleteStudent);

module.exports = router;
