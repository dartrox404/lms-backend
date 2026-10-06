const UserModel = require("./user_model");

const userRepo = {
  async login(email) {
    return UserModel.findOne({ email }).select("+password").lean(false);
  },
  async register(data) {
    return UserModel.create(data);
  },
  async findById(id) {
    return UserModel.findById(id).lean();
  },
};

module.exports = userRepo;
