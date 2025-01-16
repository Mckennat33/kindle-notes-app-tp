const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });


const signupPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../client/html/signup.html'))
      } catch(err) {
        console.log(err)
        res.status(500).send("internal Server Error")
      }
}

const userSignin = async (req, res) => {
    console.log(req)
}

module.exports = {
    signupPage,
    userSignin,
}