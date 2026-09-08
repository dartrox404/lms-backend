const appError = require("../utils/appError");

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new appError(
          "Permisson required Only admin can perform this action",
          403,
        ),
      );
    }
    next();
  };
};
