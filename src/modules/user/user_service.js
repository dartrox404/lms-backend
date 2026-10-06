const userRepo = require("./user_repo");
const AppError = require("../../utils/appError");
const {
  accessToken,
  refreshToken,
  sanitzeObject,
} = require("../../utils/token");

const userService = {
  async login(data) {
    const { email, password } = data;
    const user = await userRepo.login(email);
    if (!user || !user.comparePassword(password))
      throw new AppError("Email email or password", 401);
    const jwtToken = accessToken(user._id);
    const r_Token = refreshToken(user._id);
    const result = sanitzeObject(user);
    return { jwtToken, r_Token, result };
  },
  async register(data) {
    const { email } = data;
    const user_ex = await userRepo.login(email);
    if (user_ex) throw new AppError("Email already exists", 409);
    const user = await userRepo.register(data);
    const jwtToken = accessToken(user._id);
    const result = sanitzeObject(user);
    const r_Token = refreshToken(user._id);
    return { jwtToken, r_Token, result };
  },
  async findById(id) {
    const data = await userService.findById(id);
    const result = sanitzeObject(data);
    return result;
  },
};

module.exports = userService;
