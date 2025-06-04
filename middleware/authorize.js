const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const path = require('path')
const loginRoute = require('../routes/login.routes.js')
const cookieParser = require('cookie-parser')
app.use(cookieParser())


const authorize = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        return res.status(404).json({message: 'no user data'})
    }

}



module.exports = authorize; 


