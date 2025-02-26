const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = Schema({
    author: String, 
    title: String, 
    genre: String, 
    bookId: Number, 
    dateAdded: {
        type: Date, 
        default: Date.now
    }
})


const Book = mongoose.model("Boook", bookSchema)
module.exports = Book