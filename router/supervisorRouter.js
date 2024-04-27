const express = require('express');
const router = express.Router();
const supervisorController = require("../controllers/supervisorController.js")

router.get('/:user_id',supervisorController.getSupervisor);
router.get('/:id/projects',supervisorController.getProjects);
router.get('/:user_id/meetings',supervisorController.getMeetingsBySupervisor);
router.delete('/:user_id/meetings/:meetingId', supervisorController.deleteMeeting);

// Route to mark a meeting as missed
router.put('/:id/meetings/:meetingId/missed', supervisorController.markMeetingAsMissed);

// Route to mark a meeting as done
router.put('/:id/meetings/:meetingId/done', supervisorController.markMeetingAsDone);

// Route to edit a meeting
router.put('/:user_id/meetings/:meetingId', supervisorController.editMeeting);
router.post('/:user_id/meetings',supervisorController.createMeeting);

module.exports = router;