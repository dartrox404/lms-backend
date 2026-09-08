// modules/user/user.routes.js
const express = require("express");
const router = express.Router();
const { login, profile, register } = require("./user_controller");
const { protect } = require("../../middleware/auth");
const rateLimit = require("../../middleware/rateLimiter");
const authValidation = require("../../validator/user_validator");
const { globalValidate } = require("../../middleware/validate");

router.use(rateLimit.authRateLimit);
// Public routes
router.post(
  "/register",
  globalValidate(authValidation.registerValidator),
  register,
);
router.post("/login", globalValidate(authValidation.loginValidator), login);

// Protected routes
router.get("/me", protect, profile);

module.exports = router;
