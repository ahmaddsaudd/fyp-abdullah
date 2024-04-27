// Import necessary modules
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController')

// GET request to the root endpoint
router.get('/:user_id',projectsController.getAllProjects);
// // POST request to a specific endpoint
// router.post('/example', (req, res) => {
//   const data = req.body;
//   // Process the data as needed
//   res.json({ message: 'Data received', data });
// });

// // PUT request to update data
// router.put('/example/:id', (req, res) => {
//   const id = req.params.id;
//   const newData = req.body;
//   // Update data in the database or perform other actions
//   res.json({ message: `Data updated for ID ${id}`, newData });
// });

// // DELETE request to remove data
// router.delete('/example/:id', (req, res) => {
//   const id = req.params.id;
//   // Delete data from the database or perform other actions
//   res.json({ message: `Data deleted for ID ${id}` });
// });

// Export the router to be used in the main application
module.exports = router;
