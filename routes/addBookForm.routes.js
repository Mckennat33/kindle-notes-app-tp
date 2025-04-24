const router = express.Router()
const express = require('express')

const addBookForm = require('../controllers/addBookForm.controller.js')

router.post('/submit', addBookForm.addBook)