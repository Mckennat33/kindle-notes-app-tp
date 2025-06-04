const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const path = require('path')
const loginRoute = require('../routes/login.routes.js')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); 
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Error during token verification:", error); 
        res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports = authenticate;