const express = require('express')
// const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });
const homeController = require('../controllers/home.controller.js')
const auth = require("../middleware/auth.js")


router.get("", auth, homeController.homePage)

module.exports = router;