const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = Schema({
    author: String, 
    title: String, 
    genre: String, 
    bookId: Number
})

module.exports = mongoose.model('Book', bookSchema)