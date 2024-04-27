// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fypId: {
    type: String,
    required: true
  },
  grId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  enrollmentId: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
