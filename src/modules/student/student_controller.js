const stdService = require("./student_service");
const { catchAsync } = require("../../utils/catchAsync");
const { apiResponse, apiResponseCount } = require("../../utils/api_response");

// GET /api/students
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const data = await stdService.getAllStudent();
  apiResponseCount("Student fetched successfully", 200, res, data);
});

// GET /api/students/:id
exports.getStudentById = catchAsync(async (req, res, next) => {
  const student = await stdService.getStdById(req.params.id);
  apiResponse("Student has been fetched", 200, res, student);
});

// POST /api/students
exports.createStudent = catchAsync(async (req, res, next) => {
  const data = await stdService.create(req.body);
  apiResponse("Student has been added successfully", 201, res, data);
});

// PUT /api/students/:id
exports.updateStudent = catchAsync(async (req, res, next) => {
  const data = await stdService.updateId(req.params.id, req.body);
  apiResponse("Student has been updated", 200, res, data);
});

// DELETE /api/students/:id
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await stdService.removeId(req.params.id);
  apiResponse("Student has been removed successfully", 200, res, student);
});
