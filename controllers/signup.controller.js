
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const router = express.Router()
const _ = require('lodash')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const User = require("../models/user.js")
const loginRoute = require('../routes/login.routes.js')
const bcrypt = require('bcrypt')
const { error } = require('console')
app.use('/login', loginRoute)
const config = require('config')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const signupPage = async (req, res) => {
    try {
        await res.sendFile(path.join(__dirname, '../client/html/signup.html'))
      } catch(err) {
        console.log(err)
        res.status(500).send("internal Server Error")
      }
}

const userSignup = async (req, res) => {
  const { username, email, password} = req.body
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
      console.log(newUser)
      // create a jwt 
      const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
      if (!jwtPrivateKey) {
        console.error("FATAL ERROR: jwtPrivateKey is not defined");
        process.exit(1);
      }
      const token = jwt.sign({ userId: newUser._id }, jwtPrivateKey, { expiresIn: '1hr'})
      console.log("Signup successful, sending response...");
      res.json({ message: 'User created successfully!', username: newUser.username, email: newUser.email, token });
    }
  } catch(err) {
    return res.status(500).json({message: err.message})
  }
}

module.exports = {
    signupPage,
    userSignup,
}