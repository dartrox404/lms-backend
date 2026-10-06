const stdRepo = require("./student_repo");
const AppError = require("../../utils/appError");
const { sanitzeObject } = require("../../utils/token");

const studentService = {
  async create(data) {
    const { rollNumber } = data;
    const user_ex = await stdRepo.finByRN(rollNumber);
    if (user_ex)
      throw new AppError("Student with this email already exists", 409);
    const std = await stdRepo.create(data);
    const result = sanitzeObject(std);
    return result;
  },
  async updateId(id, data) {
    const { rollNumber } = data;
    const user_ex = await stdRepo.finByRN(rollNumber);
    if (user_ex)
      throw new AppError("Student with this email already exists", 409);
    const std = await stdRepo.updateById(id, data);
    const result = sanitzeObject(std);
    return result;
  },
  async removeId(id) {
    const std = await stdRepo.deleteById(id);
    const result = sanitzeObject(std);
    return result;
  },
  async getStdById(id) {
    const std = await stdRepo.findById(id);
    const result = sanitzeObject(std);
    return std;
  },
  async getAllStudent() {
    const std_list = await stdRepo.findAll();
    if (std_list.length === 0)
      throw new AppError("Nothing to show here go back add some!");
    return std_list;
  },
};

module.exports = studentService;
