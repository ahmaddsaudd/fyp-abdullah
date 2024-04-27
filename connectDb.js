const mongoose = require('mongoose');

// Connection URI for MongoDB Atlas
const uri = 'mongodb+srv://ahmedsaud1999:rootroot@fyp-abdullah.ezareup.mongodb.net/';

async function connectDb() {
    try {
      // Connect to MongoDB Atlas
      await mongoose.connect(uri);
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
      throw error; // Throw the error for handling in the main script
    }
  }

module.exports = connectDb;
