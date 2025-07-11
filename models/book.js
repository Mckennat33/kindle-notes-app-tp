const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new mongoose.Schema({
    author: {
        type: String, 
        required: true,
    }, 
    title: {
        type: String, 
        required: true,
    },
    notes: [ String ],
    dateAdded: {
        type: Date, 
        default: Date.now
    }
})

const Book = mongoose.model("Book", bookSchema)
module.exports = Book

