const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const Joi = require("../config/joi");
const jwt = require("jsonwebtoken");
const userRepo = require("../modules/user/user_repo");

exports.protect = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401),
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(token, Joi.JWT.JWT_SECRET);
   
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(
        new AppError("Your token has expired. Please log in again.", 401),
      );
    }

    return next(new AppError("Invalid token. Please log in again.", 401));
  }

  const currentUser = await userRepo.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("User no longer exists.", 401));
  }

  req.user = currentUser;

  next();
});
