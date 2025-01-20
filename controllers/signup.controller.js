const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });
app.use(express.json())
const User = require("../models/user.js")
const homeRoute = require('../routes/home.routes.js')
const brcrypt = require('bcrypt')
const { error } = require('console')

const signupPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../client/html/signup.html'))
      } catch(err) {
        console.log(err)
        res.status(500).send("internal Server Error")
      }
}


const userSignup = async (req, res) => {
  const {username, email, password } = req.body
  // const hashedPassword = brcrypt.hash(password, 10)
  
  try {
    const newUser = new User({
      username, 
      email,    
      password
    })
    await newUser.save()
    

  } catch(err) {
    console.log(JSON.stringify(err))
    // if (err.code === 11000) {
    //   return res.json({ status: 'error', err: 'duplicate username'})
    // }
    // console.log('new user created')
  }
}

module.exports = {
    signupPage,
    userSignup,
}