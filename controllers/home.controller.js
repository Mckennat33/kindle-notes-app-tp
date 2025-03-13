const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const catchNote = require('../services/catchnote.js')
const Book = require("../models/book.js")


// when the user goes to their home page this is when the application catches the users notes whenever the user saves their notes to the file system it catches the note




const homePage = async (req, res) => { 
    //res.json({message: 'Welcome to the home page'})
    res.sendFile(path.join(__dirname, '../client/html/home.html'));
    
    try {
        // fetching each 
        const bookInfo = Book.find({})

        console.log(bookInfo, "this is my test")
        res.send(bookInfo)
    } catch(err) {
        console.log(err)
    }
    
}



const getUserData = async (req, res) => {
    
    // verify the user token/cookies
        // if no token return unauthorized user
    // make a request for the users data 
    // send that user data to the front end 
}

module.exports = {
    homePage, 
    getUserData
}  