const Joi = require("../config/joi");
const jwt = require("jsonwebtoken");
const data = require("./date");

exports.accessToken = (userId) => {
  return jwt.sign({ id: userId }, Joi.JWT_SECRET, {
    expiresIn: Joi.JWT_EXPIRE,
  });
};

exports.refreshToken = (userId) => {
  return jwt.sign({ id: userId }, Joi.JWT_R_SECRET, {
    expiresIn: Joi.JWT_R_EXPIRE,
  });
};

exports.sanitzeObject = (data) => {
  const obj = data.toObject();
  const { _id, __V, ...rest } = data;
  return {
    ...rest,
    createdAt: date(rest.createdAt),
    updatedAt: date(rest.updatedAt),
  };
};
