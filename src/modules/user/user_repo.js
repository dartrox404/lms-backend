// modules/user/user.repository.js
const UserModel = require("./user_model");

const register = (data) => UserModel.create(data);

const login = (email) => UserModel.findOne({ email }).select("+password");

const findById = (id) => UserModel.findById(id);

module.exports = {
  register,
  login,
  findById,
};
