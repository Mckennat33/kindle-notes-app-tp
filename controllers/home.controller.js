const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')


const homePage = (req, res) => { 
    res.sendFile(path.join(__dirname, '../client/html/index.html')); 
}

module.exports = {
    homePage
}