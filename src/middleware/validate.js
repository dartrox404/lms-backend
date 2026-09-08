const appError = require("../utils/appError");

exports.globalValidate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      const messsage = error.details.map((e) => e.message).join(", ");
      return next(new appError(messsage, 400));
    }
    req[property] = value;
    next();
  };
};
