
require('dotenv').config({ path: '../.env' });  // Adjust path relative to config folder

const mongoose = require('mongoose');

console.log('MongoDB URI:', process.env.MONGODB_URI);  // This should print the URI to the console


// , { useNewUrlParser: true, useUnifiedTopology: true }
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: false, useUnifiedTopology: false })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = connectDB;