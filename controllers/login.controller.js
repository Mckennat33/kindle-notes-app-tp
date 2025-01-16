const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/login.html')); 
}

module.exports = {
    getLoginPage
}