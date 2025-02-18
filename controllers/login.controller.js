const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('../models/user.js')
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getLoginPage = async (req, res) => {
    try {
        await res.sendFile(path.join(__dirname, '../client/html/login.html')); 
    } catch(err) {
        console.log(err)
        res.status(404).send('Internal Server Error')
    }
}

const loginUser = async ( req, res ) => {
    try {
        const { username, password } = req.body
        const matchingUser = await User.findOne({ username })
        if (!matchingUser) return res.status(401).json({message: "wrong username or password"})
            
            const isPasswordValid = await bcrypt.compare(password, matchingUser.password)
            if (!isPasswordValid) return res.status(401).json({message: 'wrong username or password' })
                        
        const jwtPrivateKey = process.env.JWT_PRIVATE_KEY
        const token = jwt.sign({ userId: matchingUser._id } , jwtPrivateKey, {expiresIn: '1hr' })

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict'
        }).status(200).json({ message: 'Logged in successfully' })


    
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    } 
    
}


module.exports = {
    getLoginPage,
    loginUser
}