const mongoose = require('mongoose');

const projectEvaluationsSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  obtainedMarks: {
    type: Number,
    required: true,
  },
  weightage: {
    type: Number,
    required: true,
  },
});

const ProjectEvaluations = mongoose.model('ProjectEvaluations', projectEvaluationsSchema);

module.exports = ProjectEvaluations;
