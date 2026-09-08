// modules/student/student.model.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required."],
      unique: true,
      uppercase: true,
      trim: true,
      match: [
        /^[A-Z0-9-]+$/,
        "Roll number must contain only letters, numbers, and hyphens.",
      ],
    },
    department: {
      type: String,
      required: [true, "Department is required."],
      trim: true,
      enum: {
        values: ["CS", "SE", "IT", "EE", "ME", "CE"],
        message: "Department must be one of: CS, SE, IT, EE, ME, CE.",
      },
    },
    semester: {
      type: Number,
      required: [true, "Semester is required."],
      min: [1, "Semester must be at least 1."],
      max: [8, "Semester cannot exceed 8."],
    },
    cgpa: {
      type: Number,
      min: [0, "CGPA cannot be less than 0."],
      max: [4, "CGPA cannot exceed 4."],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

module.exports = mongoose.model("Student", studentSchema);
