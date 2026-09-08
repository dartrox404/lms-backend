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
const localValidation = require("../../validator/student_validator");

// Protect all routes
router.use(protect, rateLimit.localRateLimit);

router
  .route("/")
  .get(getAllStudents)
  .post(globalValidate(localValidation.createValidator), createStudent);

router
  .route("/:id")
  .get(getStudentById)
  .patch(globalValidate(localValidation.updateValidator), updateStudent)
  .delete(deleteStudent);

module.exports = router;
