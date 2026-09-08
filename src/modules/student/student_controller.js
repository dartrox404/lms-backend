// modules/student/student.controller.js
const studentRepo = require("./student_repo");
const AppError = require("../../utils/appError");
const { catchAsync } = require("../../utils/catchAsync");

const sendstatus = (text, res, statusCode, data) => {
  res.status(statusCode).json({ success: true, message: text, context: data });
};

// GET /api/students
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await studentRepo.findAll();
  if (students.length === 0) {
    return next(new AppError("Insufficent Records to show", 404));
  }
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// GET /api/students/:id
exports.getStudentById = catchAsync(async (req, res, next) => {
  const student = await studentRepo.findById(req.params.id);
  if (!student) {
    return next(new AppError("Student not found.", 404));
  }
  sendstatus("Data fetched successfully", res, 200, student);
});

// POST /api/students
exports.createStudent = catchAsync(async (req, res, next) => {
  const { userId, name, rollNumber, department, semester, cgpa } = req.body;
  const student = await studentRepo.create({
    userId,
    name,
    rollNumber,
    department,
    semester,
    cgpa,
  });
  sendstatus("Student has been added successfully", res, 201, student);
});

// PUT /api/students/:id
exports.updateStudent = catchAsync(async (req, res, next) => {
  const { name, rollNumber, department, semester, cgpa } = req.body;
  const student = await studentRepo.updateById(req.params.id, {
    name,
    rollNumber,
    department,
    semester,
    cgpa,
  });
  sendstatus("Student has been updated successfully", res, 200, student);
});

// DELETE /api/students/:id
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await studentRepo.deleteById(req.params.id);
  if (!student) {
    return next(new AppError("Student not found.", 404));
  }
  sendstatus("Student has been removed", res, 200, student);
});
