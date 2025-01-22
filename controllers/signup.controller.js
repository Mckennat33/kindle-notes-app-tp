const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });
app.use(express.json())
const User = require("../models/user.js")
const loginRoute = require('../routes/login.routes.js')
const bcrypt = require('bcrypt')
const { error } = require('console')

app.use('/login', loginRoute)


const signupPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../client/html/signup.html'))
      } catch(err) {
        console.log(err)
        res.status(500).send("internal Server Error")
      }
}


const userSignup = async (req, res) => {
  // take in username email password
  const { username, email, password} = req.body
  // console.log(username, email, password)
  try {
    const matchingUsername = await User.findOne({ username })
    if (matchingUsername) {
      console.log('Username already exists')
      return res.status(400).json({ message: 'username already exists'}) 
    } else {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        username, 
        email, 
        password: hashedPassword
      })
      await newUser.save()
    }
  } catch(err) {
    return res.json({message: err.message})
  }
}

// const userSignup = async (req, res) => {
//   const {username, email, password } = req.body
//   const hashedPassword = bcrypt.hash(password, 10)
//   try {
//     const newUser = new User({
//       username, 
//       email,    
//       hashedPassword
//     })
//     console.log(hashedPassword)
//     await newUser.save()
//   } catch(err) {
//     console.log(JSON.stringify(err))
//     if (err.code === 11000) {
//       return res.json({ status: 'error', err: 'duplicate username'})
//     }
//     console.log('new user created')
//   }
// }

module.exports = {
    signupPage,
    userSignup,
}