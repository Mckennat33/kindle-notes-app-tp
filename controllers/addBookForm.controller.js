const express = require('express');
const path = require('path');
const Book = require('../models/book.js');

const addBook = async (req, res) => {
    const { title, author, notes } = req.body;

    try {
        const matchingBook = await Book.findOne({ title: title, author: author });

        if (matchingBook) {
            await Book.findOneAndUpdate(
                { title: title, author: author },
                { $push: { notes: notes } }
            );
        } else {
            const manBook = new Book({
                title: title,
                author: author,
                notes: notes
            });
            console.log(manBook);
            await manBook.save();
        }

        res.status(200).json({ message: 'Book added successfully' });
    } catch (err) {
        console.log(err, "there was an error saving your manual book");
        res.status(500).json({ error: 'Failed to add book' });
    }
};

module.exports = {
    addBook
};

