const ProjectEvaluations = require('../models/projectEvaluation');

// Controller methods
const getAllProjectEvaluations = async (req, res) => {
    const { groupId, studentRollNo } = req.params;
    try {
      const evaluations = await ProjectEvaluations.find({ studentId:studentRollNo });

      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
const addProjectEvaluation = async (req, res) => {
  try {
    const { name, totalMarks, obtainedMarks, weightage } = req.body;

    const newEntry = new ProjectEvaluations({
      name,
      totalMarks,
      obtainedMarks,
      weightage,
      groupId: req.params.id, // Assuming groupId is part of the URL params
      studentId: req.params.studentid, // Assuming studentId is part of the URL params
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error adding project evaluation:', error);
    res.status(500).send('Error adding project evaluation');
  }
};
  

const deleteProjectEvaluation = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
      // Find the entry in the database and delete it
      const deletedEntry = await ProjectEvaluations.findOneAndDelete({ _id:id });
  
      if (!deletedEntry) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      res.status(200).json({ message: 'Entry deleted successfully', deletedEntry });
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const updateEntry = async (req, res) => {
    try {
      const { groupId, studentRollNo, id } = req.params;
      const { name, totalMarks, obtainedMarks, weightage } = req.body;
  
      // Validate request data (optional, use as needed)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Find the entry by ID and update its fields
      const updatedEntry = await ProjectEvaluations.findOneAndUpdate(
        { _id: id, groupId, studentRollNo },
        { name, totalMarks, obtainedMarks, weightage },
        { new: true }
      );
  
      if (!updatedEntry) {
        return res.status(404).json({ message: 'Entry not found' });
      }
  
      res.json(updatedEntry);
    } catch (error) {
      console.error('Error updating entry:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
module.exports = {
  getAllProjectEvaluations,
  updateEntry,
  addProjectEvaluation,
  deleteProjectEvaluation,
};
