// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const Joi = require("../config/joi");

exports.protect = (req, res, next) => {
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
  jwt.verify(token, Joi.JWT.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new AppError("Your token has expired. Please log in again.", 401),
        );
      }
      return next(new AppError("Invalid token. Please log in again.", 401));
    }
    req.user = decoded;
    next();
  });
};
