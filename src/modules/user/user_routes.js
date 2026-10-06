// modules/user/user.routes.js
const express = require("express");
const router = express.Router();
const { login, profile, register } = require("./user_controller");
const { protect } = require("../../middleware/auth");
const {
  loginValidator,
  registerValidator,
} = require("../../validator/user_validator");
const { globalValidate } = require("../../middleware/validate");

// Public routes
router.route("/register").post(globalValidate(registerValidator), register);
router.route("/login").post(globalValidate(loginValidator), login);

// Protected routes
router.route("/me").get(protect, profile);

module.exports = router;
