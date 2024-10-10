const express = require('express');

const connectDB = require('./db');

const userRoute = require('./routes/userRoute');
const requestRoutes = require('./routes/requestRoute');


const cors = require('cors');

const app = express();
const port = 5000; // Backend will run on port 5000

// cor policy fix [JIRA: BAC-7]
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to the database
connectDB();

// Define routes
app.use('/api/users', userRoute);
app.use('/api', requestRoutes);


app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});