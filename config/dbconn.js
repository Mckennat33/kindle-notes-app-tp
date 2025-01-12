
require('dotenv').config({ path: '../.env' });  // Adjust path relative to config folder

const mongoose = require('mongoose');

console.log('MongoDB URI:', process.env.MONGODB_URI);  // This should print the URI to the console

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = connectDB;