const express = require('express')
const path = require('path')
const Book = require('../models/book.js')

const addBook = async (req, res) => {
    const {title, author, notes} = req.body
    // console.log(title, author, notes)
    // console.log('this worked from the front end')
    try {
        const matchingBook = await Book.findOne({ title: title, author: author })
        if (matchingBook) {
            console.log('book already exists')
            Book.updateOne(
                {author: author},
                { $push: { notes: notes }}
            )
        } else {
            const manBook = new Book({
                title: title, 
                author: author, 
                notes: notes
            })    
            console.log(manBook)
            await manBook.save()
        }
    } catch(err) {
        console.log(err, "there was an error saving your manual book")
    }

    res.status(200).json({ message: 'Book added successfully' })
}

module.exports = {
    addBook
}