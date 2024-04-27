// addDummyStudents.js
const mongoose = require('mongoose');
const Student = require('../models/student');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define dummy student data
const dummyStudents = [
  {
    rollNo: 'A123',
    name: 'John Doe',
    fypId: 'FYP001',
    grId: 'GR001',
    email: 'john@example.com',
    password: 'password1',
    enrollmentId: 'EN001',
    mobileNo: '123-456-7890'
  },
  {
    rollNo: 'B456',
    name: 'Jane Smith',
    fypId: 'FYP002',
    grId: 'GR002',
    email: 'jane@example.com',
    password: 'password2',
    enrollmentId: 'EN002',
    mobileNo: '987-654-3210'
  }
  // Add more dummy students as needed
];

// Add dummy students to the database
async function addDummyStudents() {
  try {
    await Student.insertMany(dummyStudents);
    console.log('Dummy students added successfully');
  } catch (err) {
    console.error('Error adding dummy students:', err.message);
  } finally {
    // Close the connection to MongoDB
    mongoose.disconnect();
  }
}

// Call the function to add dummy students
addDummyStudents();
