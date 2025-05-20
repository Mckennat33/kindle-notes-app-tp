const express = require('express')
//const app = express()
const router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env ' });
const homeController = require('../controllers/home.controller.js')
const addBookForm = require('../controllers/addBookForm.controller.js')

router.get("", homeController.homePage)
router.get("/data", homeController.getUserData)
router.post("/submit", addBookForm.addBook)


// not sure if these below were notes out for a reason 
// router.get('/', homeController.getUserData);

// router.get("", homeController.catchNote)


module.exports = router;

