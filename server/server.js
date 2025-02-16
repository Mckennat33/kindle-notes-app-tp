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
const homeRoute = require('../routes/home.routes.js')
const connectDB = require("../config/dbconn.js")
const auth = require('../middleware/auth.js')
require('dotenv').config({ path: '../.env' });
const cookieParser = require('cookie-parser')
connectDB()
const config = require('config')  

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client')))
app.use('/', loginRoute)
app.use('/home', auth, homeRoute)
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
const port = process.env.PORT || 80
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})  


// init home page
// if user is not logged in take to login page
// 
// if no user has no login take to sign up page
