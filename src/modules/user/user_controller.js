// modules/user/user.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("./user_repo");
const AppError = require("../../utils/appError");
const Joi = require("../../config/joi");
const { catchAsync } = require("../../utils/catchAsync");

const signToken = (id) =>
  jwt.sign({ id }, Joi.JWT.JWT_SECRET, {
    expiresIn: Joi.JWT.JWT_EXPIRE || "7d",
  });

const sendStatus = (text, res, statusCode, data, token) => {
  data.password = undefined;
  res
    .status(statusCode)
    .json({ success: true, message: text, Token: token, context: data });
};

// POST /api/auth/register
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await userRepo.register({
    name,
    email,
    password,
    role: role || "student",
  });
  const token = signToken(user._id);
  sendStatus("User has been registered successfully", res, 201, user, token);
});

// POST /api/auth/login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userRepo.login(email);
  if (!user) {
    return next(new AppError("Invalid email or password.", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid email or password.", 401));
  }
  const token = signToken(user._id);
  sendStatus("User has been logged in successfully", res, 200, user, token);
});

// GET /api/users/me
exports.profile = catchAsync(async (req, res, next) => {
  const user = await userRepo.findById(req.user.id);
  if (!user) {
    return next(new AppError("User not found.", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
