const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const Book = require('../models/book.js');

const book = new Book({
  author: 'Thomas', 
  title: "They wanna be me"
})



app.use(express.static(path.join(__dirname, '../client')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..client/index.html'))
// })

app.get('/', (req, res) => {
  res.send(book)
})



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`, book)
})  