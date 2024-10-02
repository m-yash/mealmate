// const mongoose = require('mongoose')

// // Option A: Use MongoDB Atlas (cloud)
// // const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority';

// // Option B: Use MongoDB locally
// const mongoURI = 'mongodb://MealMate/mealmate'; // Replace 'myDatabase' with your DB name

// mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedToplogy: true})
// .then(() => {console.log('MongoDB Connected');})
// .catch(err => {console.error('Failed to connect: ', err);});

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mealmate');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;