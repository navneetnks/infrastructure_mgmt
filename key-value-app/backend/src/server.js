const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware (must be applied BEFORE routes)
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || `mongodb://mongodb/${process.env.KEY_VALUE_DB}`;
const mongoUser = process.env.KEY_VALUE_USER;
const mongoPass = process.env.KEY_VALUE_PASSWORD;
const mongoAuthSource = process.env.KEY_VALUE_DB;
const { healthRouter } = require('./routes/health');
const { keyValueRouter } = require('./routes/store');



// Use routers
app.use('/health', healthRouter);
app.use('/store', keyValueRouter);

// Connect to MongoDB
console.log('Connecting to MongoDB at', mongoUri, 'auth user:', mongoUser, 'authSource:', mongoAuthSource);

mongoose.connect(mongoUri, { auth: { username: mongoUser, password: mongoPass }, authSource: mongoAuthSource, connectTimeoutMS: 5000 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Key-Value Store API. This is new version. ');
});


module.exports = app;