const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const catchNote = require('../services/catchnote.js')
const jwt = require('jsonwebtoken')
const Book = require("../models/book.js")
const cookieParser = require('cookie-parser');
require('dotenv').config();

const homePage = async (req, res) => { 
    try {
        await res.sendFile(path.join(__dirname, '../client/html/home.html'));
    } catch(err) {
        console.log(err)
        res.send("Error getting Book Data")
    }   
}

const getUserData = async (req, res) => {
    try {
    
        const token = req.cookies.access_token
        if(!token) return res.status(401).json({message: 'no token provided'})

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log(decoded)

        const bookInfo = await Book.find({  })

        console.log(bookInfo.userId)

        res.json(bookInfo)
    } catch(err) {
        console.log(err)
        res.status(500).send("Error getting book data")
    }
}

module.exports = {
    homePage,
    getUserData
}  