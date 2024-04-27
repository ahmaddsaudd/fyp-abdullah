const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  student1RollNo: {
    type: String,
    required: true,
  },
  student2RollNo: {
    type: String,
    required: true,
  },
  student3RollNo: {
    type: String,
    required: true,
  },
  fypId: {
    type: String,
    required: true,
  },
  grpId: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  member1: {
    type: String,
    required: true,
  },
  member2: {
    type: String,
    required: true,
  },
  member3: {
    type: String,
    required: true,
  },
  contactNo1: {
    type: String,
    required: true,
  },
  contactNo2: {
    type: String,
    required: true,
  },
  contactNo3: {
    type: String,
    required: true,
  },
  email1: {
    type: String,
    required: true,
  },
  email2: {
    type: String,
    required: true,
  },
  email3: {
    type: String,
    required: true,
  },
  enrollment1: {
    type: String,
    required: true,
  },
  enrollment2: {
    type: String,
    required: true,
  },
  enrollment3: {
    type: String,
    required: true,
  },
  supervisorId:{
    type:String,
    required:false,
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
