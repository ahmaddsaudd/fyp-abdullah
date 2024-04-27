const express = require('express');
const { Form, Response, Student, Admin } = require('./model');
const router = express.Router();

// Admin: Create a new form
router.post('/forms', async (req, res) => {
    try {
        const { title, fields } = req.body;
        console.log("hi")
        console.log(req.body)
        const newForm = new Form({ title, fields });
        console.log(newForm)
        await newForm.save();
        res.status(201).json(newForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ error: 'An error occurred while creating the form' });
    }
});

// Admin: View responses for a form
router.get('/forms/:formId/responses', async (req, res) => {
    try {
        const { formId } = req.params;
        const responses = await Response.find({ formId }).populate('studentId');
        res.json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: 'An error occurred while fetching responses' });
    }
});

// Student: View a specific form
router.get('/forms/:formId', async (req, res) => {
    try {
        const { formId } = req.params;
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        console.error('Error fetching form:', error);
        res.status(500).json({ error: 'An error occurred while fetching the form' });
    }
});

// Student: Submit a response to a form
router.post('/forms/:formId/response', async (req, res) => {
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

// Student: Get forms assigned to the student
router.get('/student/forms', async (req, res) => {
    try {
        const { studentId } = req.query;
        const student = await Student.findById(studentId).populate('forms');
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student.forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ error: 'An error occurred while fetching the forms' });
    }
});

module.exports = router;
