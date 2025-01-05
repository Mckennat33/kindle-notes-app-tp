const mongoose = require('mongoose')


const bookSchema = mongoose.Schema({
    author: String, 
    title: String
})

module.exports = mongoose.model('Book', bookSchema)