const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected for Notes Backend');
    app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  })
  .catch(err => console.error(err));


app.use(bodyParser.json());
app.get('/api/notes', (req, res) => {
  res.send('Welcome to the Notes Backend API');
});


module.exports = app;