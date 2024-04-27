const Supervisor = require('../models/supervisors');
const Projects = require('../models/project');
const Meeting = require('../models/Meeting');


const getSupervisor = async (req, res) => {
  try {
    let { user_id } = req.params;
    user_id = parseInt(user_id)
    const supervisor = await Supervisor.findOne({ user_id: user_id });
    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }
    res.status(200).json(supervisor);
  } catch (error) {
    console.error('Error fetching supervisor:', error);
    res.status(500).json({ message: 'Error fetching supervisor' });
  }
};

const getProjects = async (req, res) => {
  try {
    const id = req.params.id;
    const projects = await Projects.find({ supervisorId: id })
    res.send(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching supervisor projects' });
  }
};
const getMeetingsBySupervisor = async (req, res) => {
  try {
    const supervisorId = req.params.user_id;
    const meetings = await Meeting.find({ supervisorId });

    res.json(meetings);
  } catch (err) {
    console.error('Error fetching meetings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const createMeeting = async (req, res) => {
  try {
    console.log(req.body)
    const { agenda, groupId, schedule, venue, googleMeetLink, user_id, status } = req.body;
    const newMeeting = new Meeting({
      agenda,
      groupId,
      schedule,
      venue,
      googleMeetLink,
      status,
      supervisorId: user_id,
    });

    const savedMeeting = await newMeeting.save();

    res.status(201).json(savedMeeting);
  } catch (err) {
    console.error('Error creating meeting:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.meetingId;
    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const markMeetingAsMissed = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { status: 'missed' },
      { new: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(updatedMeeting);
  } catch (error) {
    console.error('Error marking meeting as missed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const markMeetingAsDone = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { status: 'done' },
      { new: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(updatedMeeting);
  } catch (error) {
    console.error('Error marking meeting as done:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const editMeeting = async (req, res) => { 
  console.log(req.params.meetingId)
  try {
    const { meetingId } = req.params;
    const { 
      agenda,
      groupId,
      schedule,
      venue,
      googleMeetLink,
      status,
      supervisorId,
    } = req.body;
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { agenda, groupId, schedule, venue, googleMeetLink, supervisorId,status },
      { new: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(updatedMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getSupervisor, getProjects, getMeetingsBySupervisor, deleteMeeting, markMeetingAsMissed, markMeetingAsDone, editMeeting, createMeeting };
