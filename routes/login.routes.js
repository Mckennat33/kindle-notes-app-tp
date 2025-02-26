const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const router = express.Router()
const loginController = require('../controllers/login.controller.js')

router.get('/', loginController.getLoginPage)
router.post('/', loginController.loginUser)

module.exports = router; 