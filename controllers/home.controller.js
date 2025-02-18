const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')


const homePage = (req, res) => { 
    //res.json({message: 'Welcome to the home page'})
    res.sendFile(path.join(__dirname, '../client/html/home.html')); 
}

module.exports = {
    homePage
}  