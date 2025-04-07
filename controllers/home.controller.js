const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const catchNote = require('../services/catchnote.js')
const Book = require("../models/book.js")

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
        const bookInfo = await Book.find({})
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