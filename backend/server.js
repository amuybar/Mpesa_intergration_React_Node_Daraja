// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const stkRoutes = require('./routes/stkRoutes.js');
const callbackRoute=require('./routes/callBackRoutes.js')
const transactionRoutes = require('./routes/transactionRoutes.js');

// Configure Express to use body-parser and CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_URL)
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Error connecting to MongoDB:', err));

// Define routes
app.use('/api', stkRoutes);
app.use('/transactions', transactionRoutes);

// Root route
app.use('/callback',callbackRoute );


app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the MPESA API'
  });
});

// Callback route from Safaricom

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start server
const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log(`Server is running on port ${port}`);
});