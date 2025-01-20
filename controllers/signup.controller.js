const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });
app.use(express.json())
const User = require("../models/user.js")
const homeRoute = require('../routes/home.routes.js')

const signupPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../client/html/signup.html'))
      } catch(err) {
        console.log(err)
        res.status(500).send("internal Server Error")
      }
}


const userSignup = async (req, res) => {
  
  try {
    const {username, email, password } = req.body
    const newUser = new User({
      username, 
      email, 
      password
    })
    res.status(202).json({message: "user was added"})
    await newUser.save()
  } catch(err) {
    console.log(err, "This is not working")
  }
}

module.exports = {
    signupPage,
    userSignup,
}