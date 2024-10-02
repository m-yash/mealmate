const mongoose = require('mongoose');
const User = require('./models/User'); // Path to your User model
const connectDB = require('./db');     // Path to your MongoDB connection

connectDB(); // Connect to the database

// Insert a new user
const createUser = async () => {
  const user = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password_hash: 'hashedpassword',
    location: { lat: 51.5074, lng: -0.1278 },  // Example latitude and longitude
    role: 'user'
  });

  await user.save(); // Save the user to the database
  console.log('User saved:', user);

  mongoose.connection.close(); // Close the database connection
};

createUser();