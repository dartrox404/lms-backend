const rateLimit = require("express-rate-limit");

const authRateLimit = rateLimit({
  windowMs: 15 * 16 * 1000,
  standardHeaders: false,
  limit: 10,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many attempts try in 15 minute",
  },
});
const localRateLimit = rateLimit({
  windowMs: 15 * 16 * 1000,
  standardHeaders: false,
  limit: 1000,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too many attempts try in 15 minute",
  },
});

module.exports = { authRateLimit, localRateLimit };
