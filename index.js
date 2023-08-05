const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const resourceRoutes = require('./routes/resource');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Connect routes
app.use('/api/resource', resourceRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the RESTful API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
