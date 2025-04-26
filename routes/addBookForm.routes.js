const express = require('express')
const router = express.Router()

const addBookForm = require('../controllers/addBookForm.controller.js')

router.post('/home/submit', addBookForm.addBook)

module.exports = router;