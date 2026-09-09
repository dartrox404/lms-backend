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
const localValidation = require("../../validator/student_validator");
const queryValidation = require("../../validator/student_validator");

// Protect all routes
router.use(protect, rateLimit.localRateLimit);

router
  .route("/")
  .get(queryValidation.getStudentsQueryValidator, getAllStudents)
  .post(
    restrictTo("admin"),
    globalValidate(localValidation.createValidator),
    createStudent,
  );

router
  .route("/:id")
  .get(getStudentById)
  .patch(
    restrictTo("admin"),
    globalValidate(localValidation.updateValidator),
    updateStudent,
  )
  .delete(restrictTo("admin"), deleteStudent);

module.exports = router;
