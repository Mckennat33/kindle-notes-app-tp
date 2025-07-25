const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const Book = require('../models/book.js');
const Notes = require('../models/highlightedNotes.js')
const { STATUS_CODES } = require('http')
const mongoose = require('mongoose')
const signupRoute = require("../routes/signup.routes.js")
const loginRoute = require('../routes/login.routes.js')
const addBookForm = require('../routes/addBookForm.routes.js')
const homeRoute = require('../routes/home.routes.js')
const connectDB = require("../config/dbconn.js")
const catchNote = require("../services/catchnote.js")
const authenticate = require('../middleware/authenticate.js')
const authorize = require('../middleware/authorize.js')
require('dotenv').config({ path: '../.env' });
const cookieParser = require('cookie-parser')
// const config = require('config')  


app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client')))
app.use('/', loginRoute)
app.use('/home', authenticate, homeRoute)
// app.use('/home/data', authenticate, authorize, homeRoute)
app.use('/home/data', authenticate, homeRoute)
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/home/submit', addBookForm)

const port = process.env.PORT || 80

// Notes from the work computer 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please kill the process using it or try another port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});
