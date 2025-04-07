const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const path = require('path')
const loginRoute = require('../routes/login.routes.js')

require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        //console.log("Verifying token..."); // Log before verification
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // Verify the token
        //console.log('Decoded token:', decoded); // Log decoded token if successful
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        console.error("Error during token verification:", error); // Log the error message
        res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports = auth;