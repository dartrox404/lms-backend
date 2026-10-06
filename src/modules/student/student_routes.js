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
const { globalValidate } = require("../../middleware/validate");
const { restrictTo } = require("../../middleware/restrictRole");

const {
  createValidator,
  updateValidator,
} = require("../../validator/student_validator");

// Protect all student routes

router.route("/").get(getAllStudents);
router.route("/:id").get(getStudentById);
router.use(protect);
router
  .route("/")
  .post(restrictTo("admin"), globalValidate(createValidator), createStudent);
router
  .route("/:id")
  .patch(restrictTo("admin"), globalValidate(updateValidator), updateStudent)
  .delete(restrictTo("admin"), deleteStudent);

module.exports = router;
