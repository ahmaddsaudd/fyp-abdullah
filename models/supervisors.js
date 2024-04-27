const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  numOfGroups: {
    type: Number,
    required: true,
  },
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

module.exports = Supervisor;
