const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/formapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB on formapp'))
    .catch(error => console.error('Failed to connect to MongoDB:', error));

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Define Mongoose schemas and models
const formSchema = new mongoose.Schema({
    title: String,
    fields: [Object]
});
const Form = mongoose.model('Form', formSchema);

const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    studentId: mongoose.Schema.Types.ObjectId,
    fields: Object
});
const Response = mongoose.model('Response', responseSchema);

const studentSchema = new mongoose.Schema({
    name: String,
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }]
});
const Student = mongoose.model('Student', studentSchema);

// Admin: Create a new form
app.post('/forms', async (req, res) => {
    try {
        const { title, fields } = req.body;
        const newForm = new Form({ title, fields });
        await newForm.save();
        res.status(201).json(newForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ error: 'An error occurred while creating the form' });
    }
});

// Admin: Assign a form to a student
app.post('/students/:studentId/assign', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { formId } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.forms.push(formId);
        await student.save();

        res.status(200).json({ message: 'Form assigned to student successfully' });
    } catch (error) {
        console.error('Error assigning form to student:', error);
        res.status(500).json({ error: 'An error occurred while assigning the form' });
    }
});

// Student: View assigned forms
app.get('/students/:studentId/forms', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('forms');
        console.log("gi stiyde ",student)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student.forms);
    } catch (error) {
        console.error('Error fetching assigned forms:', error);
        res.status(500).json({ error: 'An error occurred while fetching assigned forms' });
    }
});

// Student: Submit a response to a form
app.post('/forms/:formId/response', async (req, res) => {
    try {
        const { formId } = req.params;
        const { studentId, fields } = req.body;

        const newResponse = new Response({
            formId,
            studentId,
            fields,
        });

        await newResponse.save();
        res.status(201).json(newResponse);
    } catch (error) {
        console.error('Error submitting response:', error);
        res.status(500).json({ error: 'An error occurred while submitting the response' });
    }
});

// Define a route to fetch all students
app.get('/students', async (req, res) => {
    try {
        // Fetch all students from the database using Mongoose
        const students = await Student.find().select('name'); // Select only the name field to be returned
        
        // Return the list of students as a JSON response
        res.json(students);
    } catch (error) {
        // Log and handle any errors
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'An error occurred while fetching students' });
    }
});
// Define a route to fetch all forms
app.get('/forms', async (req, res) => {
    try {
        // Fetch all forms from the database using Mongoose
        const forms = await Form.find(); // Fetches all forms

        // Return the list of forms as a JSON response
        res.json(forms);
    } catch (error) {
        // Log and handle any errors
        console.error('Error fetching forms:', error);
        res.status(500).json({ error: 'An error occurred while fetching forms' });
    }
});


// Admin: View responses for a form
app.get('/forms', async (req, res) => {
    try {
        const forms = await Form.find().populate('assignedTo');
        res.json(forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ error: 'An error occurred while fetching forms' });
    }
});

// Fetch responses for a specific form
app.get('/forms/:formId/responses', async (req, res) => {
    try {
        const { formId } = req.params;
        const responses = await Response.find({ formId })
            .populate('studentId')
            .exec();
        res.json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: 'An error occurred while fetching responses' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
