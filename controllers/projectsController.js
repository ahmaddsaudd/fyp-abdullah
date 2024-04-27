const Project = require('../models/project');

// Get all projects
const getAllProjects = async (req, res) => {

  try {
    let user_id = req.params.user_id;
    user_id = parseInt(user_id)
    const projects = await Project.find({user_id});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new project
const createProject = async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    // Add more fields as needed
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a project by ID
const updateProjectById = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a project by ID
const deleteProjectById = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
};
