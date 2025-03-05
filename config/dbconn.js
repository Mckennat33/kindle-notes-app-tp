
require('dotenv').config({ path: '../.env' });  // Adjust path relative to config folder

const mongoose = require('mongoose');

mongoose.set('debug', true);

const dbURI = process.env.MONGODB_URI

const connectDB = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

module.exports = connectDB;