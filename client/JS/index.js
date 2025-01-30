// Starter code
const express = require('express')
const app = express()
app.listen(3000)

require('dotenv').config()

app.get('/posts', (req, res) => {
    res.json(req)
})

const posts = [
    {
        username: 'Kyle', 
        title: 'Post 1'
    }, 
    {
        username: 'Jim', 
        title: 'Post 2'
    }
]
// in our config file we have what we need to start a jwt

// This will help us so that when a user signs up, he wont have to log in seperately and it will go right to his page. 
// json web token

const config = require('config')
const jwt = require('jsonwebtoken')

// generates a token
const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))

res.send(token)

// creating a jwt
const user = { name: username }
const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
res.json({ accessToken: accessToken })

// we return the jwt in a http header 




