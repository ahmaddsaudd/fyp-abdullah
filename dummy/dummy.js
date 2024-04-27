// createUser.js

const mongoose = require('mongoose');
const User = require('../models/user');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  // Create a dummy user
  const dummyUser = new User({
    username: 'test',
    password: '123',
 
    // Add more fields as needed
  });

  // Save the user to the database
  await dummyUser.save();
  console.log('User created successfully:', dummyUser);

  // Close the connection
  mongoose.connection.close();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
