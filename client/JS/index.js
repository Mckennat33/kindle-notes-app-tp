// // Starter code
// // server.js

// const express = require('express')
// const app = express()
// const config = require('config')
// const jwt = require('jwt')
// const bcrypt = require('bcrypt')



// app.post('/register', (req, res) => {
//     const { username, password } = req.body
//     const salt = 10
//     const hashedPassword = bcrypt.hash(password, salt)
//     const newUser = new User({
//         username, 
//         password: hashedPassword
//     })
//     newUser.save()
//     res.send(newUser)

// })


// app.post('/login',  (req, res) => {
//     const { username, password } = req.body
//     const matchUsername = User.find({ username })
//     if (!matchUsername) return res.status(401)
    
    
//     const token = jwt.sign({ _id: id }, config.get('privete-key'))  

// }) 