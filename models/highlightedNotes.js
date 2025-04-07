const mongoose = require('mongoose')
const { Schema } = mongoose

const highlightedNotes = Schema({
    content: String, 
    pageNumber: Number, 
    book: String
})

module.exports = mongoose.model('Notes', highlightedNotes)




// Module 
// greeting.js




