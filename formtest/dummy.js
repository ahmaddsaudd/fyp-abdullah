const mongoose = require('mongoose');
const { Student } = require('./model'); // Assuming 'model.js' contains the Student schema

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB on formapp');

        // Create a dummy student
        const createDummyStudent = async () => {
            // Define a new dummy student
            const dummyStudent = new Student({
                name: 'John Doe',
                email: 'johndoe@example.com',
                forms: [] // Initially, the student has no forms assigned
            });

            // Save the student to the database
            const savedStudent = await dummyStudent.save();

            // Print the details of the created student
            console.log('Dummy student created:');
            console.log('Student ID:', savedStudent._id);
            console.log('Name:', savedStudent.name);
            console.log('Email:', savedStudent.email);
        };

        // Create the dummy student
        createDummyStudent()
            .then(() => {
                // Close the database connection once done
                mongoose.connection.close();
                console.log('Database connection closed.');
            })
            .catch(error => {
                console.error('Error creating dummy student:', error);
                mongoose.connection.close();
            });
    })
    .catch(error => console.error('Failed to connect to MongoDB:', error));
