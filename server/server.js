const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const Book = require('../models/book.js');
const Notes = require('../models/highlightedNotes.js')
const { STATUS_CODES } = require('http')
const mongoose = require('mongoose')
const connectDB = require("../config/dbconn.js")
require('dotenv').config();
require('dotenv').config({ path: '../.env ' });
// connect to mongodb 
connectDB()



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../client')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/html/index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/html/login.html')); 
});


app.get('/signup', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../client/html/signup.html'))
  } catch(err) {
    console.log(err)
    res.status(500).send("internal Server Error")
  }
})

app.post('/signup', (req, res) => {

  const { username, email, password } = req.body 

  res.status(200).send({username, email, password})
  console.log(username, email, password)
})


const port = process.env.PORT || 3000


//just added this
// mongoose.connection.once('open', () => {
//   console.log("connected to mongodb")
//   app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`)
//   })  
// })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})  

