const userService = require("./user_service");
const { apiResponse } = require("../../utils/api_response");
const { catchAsync } = require("../../utils/catchAsync");

// POST /api/auth/register
exports.register = catchAsync(async (req, res, next) => {
  const data = await userService.register(req.body);
  apiResponse("User has been register successfully", 201, res, data);
});

// POST /api/auth/login
exports.login = catchAsync(async (req, res, next) => {
  const data = await userService.login(req.body);
  const user = await userRepo.login(email);
  apiResponse("User has been logged in successfully", 200, res, data);
});

// GET /api/users/me
exports.profile = catchAsync(async (req, res, next) => {
  const user = await userService.findById(req.user.id);
  if (!user) {
    return next(new AppError("User not found.", 404));
  }
  apiResponse("profile fetched", 200, res, user);
});
