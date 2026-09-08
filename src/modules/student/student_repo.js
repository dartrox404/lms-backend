// modules/student/student.repository.js
const StudentModel = require("./student_model");

const findAll = () => StudentModel.find().sort({ createdAt: -1 });
const findById = (id) => StudentModel.findById(id);
const create = (data) => StudentModel.create(data);
const updateById = (id, data) =>
  StudentModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
const deleteById = (id) => StudentModel.findByIdAndDelete(id);
const findByUserId = (userId) => StudentModel.findOne({ user: userId });

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  findByUserId,
};
