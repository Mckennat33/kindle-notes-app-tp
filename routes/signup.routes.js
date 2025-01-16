const express = require('express')
// const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });
const signupController = require('../controllers/signup.controller.js')



router.get('/', signupController.signupPage)

router.post('/', signupController.userSignin)

module.exports = router; 