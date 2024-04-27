const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fields: [
        {
            label: { type: String, required: true },
            type: { type: String, required: true },
        }
    ]
});

const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    fields: [
        {
            label: { type: String, required: true },
            value: { type: String, required: true },
        }
    ]
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }]
});

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Form = mongoose.model('Form', formSchema);
const Response = mongoose.model('Response', responseSchema);
const Student = mongoose.model('Student', studentSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Form, Response, Student, Admin };
