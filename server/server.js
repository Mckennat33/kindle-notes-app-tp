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
require('dotenv').config({ path: '../.env ' });
connectDB()
const config = require('config')

if fig.get('jstPrivateKey')


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client')))
app.use('/', homeRoute)
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
const port = process.env.PORT || 80
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})  


