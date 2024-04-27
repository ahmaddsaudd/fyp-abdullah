const express = require('express');
const router = express.Router();
const projectEvaluationsController = require('../controllers/projectsEvaluationController');

// Routes for projectEvaluations

router.post('/:id/student/:studentid/entries', projectEvaluationsController.addProjectEvaluation);
router.get('/:groupId/student/:studentRollNo/entries', projectEvaluationsController.getAllProjectEvaluations);
router.delete('/:groupId/student/:studentRollNo/entries/:id', projectEvaluationsController.deleteProjectEvaluation);
router.put('/:groupId/student/:studentRollNo/entries/:id', projectEvaluationsController.updateEntry);


module.exports = router;
