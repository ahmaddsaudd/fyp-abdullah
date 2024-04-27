const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  agenda: { type: String, required: true },
  groupId: { type: String, required: true },
  schedule: { type: Date, required: true },
  venue: { type: String, enum: ['physical', 'online'], required: true },
  googleMeetLink: { type: String,required:false },
  status: { type: String, enum: ['scheduled', 'cancelled', 'missed', 'done'], default: 'scheduled' },
  supervisorId: { type: String, required: true } 
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;

