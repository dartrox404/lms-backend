// modules/student/student.repository.js
const student_model = require("./student_model");
const StudentModel = require("./student_model");

// const findAll = () => StudentModel.find().sort({ createdAt: -1 });
const findAll = async ({
  page,
  limit,
  department,
  semester,
  minCgpa,
  maxCgpa,
  search,
  sortBy,
  sortOrder,
}) => {
  const filter = {};

  if (department) {
    filter.department = department;
  }
  if (semester) {
    filter.semester = semester;
  }

  if (minCgpa !== undefined || maxCgpa !== undefined) {
    filter.cgpa = {};
    if (minCgpa !== undefined) {
      filter.cgpa.$gte = minCgpa;
    }
    if (maxCgpa !== undefined) {
      filter.cgpa.$lte = maxCgpa;
    }
  }

  if (search) {
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [
      { name: { $regex: safeSearch, $options: "i" } },
      { rollNumber: { $regex: safeSearch, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
    _id: 1,
  };

  const [students, total] = await Promise.all([
    StudentModel.find(filter).sort(sort).skip(skip).limt(limit).lean(),
    StudentModel.countDocuments(filter),
  ]);
  return {
    students,
    total,
  };
};

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
