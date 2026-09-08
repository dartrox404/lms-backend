const appError = require("../utils/appError");

exports.globalValidate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message).join(", ");
      return next(new appError(message, 400));
    }
    req[property] = value;
    next();
  };
};
