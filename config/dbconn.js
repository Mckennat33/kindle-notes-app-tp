
//require('dotenv').config({ path: '../.env' });  // Adjust path relative to config folder
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const mongoose = require('mongoose');


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



module.exports = connectDB;