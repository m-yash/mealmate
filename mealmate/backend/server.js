const express = require('express');

const connectDB = require('./db');

const userRoute = require('./routes/userRoute');
const chefRoute = require('./routes/chefRoute');

const requestRoutes = require('./routes/requestRoute');

const responseRoute = require('./routes/responseRoute');

const profileUpdateRoute = require('./routes/profileUpdateRoute');

const statisticRoute = require('./routes/statisticRoute');

const bookingRoute = require('./routes/bookingRoute');


const cors = require('cors');

const app = express();
const port = 5000; // Backend will run on port 5000

// cor policy fix [JIRA: BAC-7]
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to the database
connectDB();

require('dotenv').config();

// Define routes
app.use('/user', userRoute);
app.use('/chef', chefRoute);

app.use('/request', requestRoutes);
app.use('/responses', responseRoute);

app.use('/user', profileUpdateRoute);

app.use('/stats', statisticRoute);

app.use('/booking', bookingRoute);




app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});