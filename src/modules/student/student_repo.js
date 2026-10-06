const StudentModel = require("./student_model");

const studentRepo = {
  async findById(id) {
    return StudentModel.findById(id).lean();
  },
  async create(data) {
    return StudentModel.create(data);
  },
  async updateById(id, data) {
    StudentModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  },
  async deleteById(id) {
    return StudentModel.findByIdAndDelete(id).lean();
  },
  async finByRN(rollNumber) {
    return StudentModel.findOne({ rollNumber }).lean();
  },
  async findAll() {
    return StudentModel.find().sort({ createdAt: -1 }).lean();
  },
};

module.exports = studentRepo;
