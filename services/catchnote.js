const express = require('express')
const chokidar = require('chokidar')
const mongoose = require('mongoose')
const csv = require('csv-parser')
const app = express()
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '../.env' });
app.use(express.json())

const Book = require("../models/book.js")
const connectDB = require("../config/dbconn.js");
connectDB()

// watch for when the user adds a new book
// take that book parse the csv file and add that to the database


// if book already exists in the database return error: book already exists. 



const catchDownloadedNote = () => {
    try {    
        const watcher = chokidar.watch('C:/Users/thoma/Downloads', 
            {
                persistent: true, 
                ignoreInitial: true
            }
        )
        watcher.on('add', (path) => {
            if (path.endsWith(".tmp") || path.endsWith(".crdownload")) {
                return; 
            }
            if (path.endsWith('csv')) {
                try {
                    parseBook(path)
                } catch(err) {
                    console.log("Error while parsing book:", err)
                }
            }  
        })
        
    } catch(err) {
        console.log(err)
    }
}

const parseBook = async (path) => {
    const results = []
    try {
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            const bookNotes = results.slice(7, results.length)
            const [{ "Your Kindle Notes For:": bookTitle }, { "Your Kindle Notes For:": author }] = results 
            const [{ "": notes }] = bookNotes
            const bookNotesArray = []
            bookNotes.map((notes) => {
                const {"": allNotes} = notes
                bookNotesArray.push(allNotes)
            })

            const matchingBook = await Book.findOne({title: bookTitle})
            if (matchingBook) {
                console.log("Book already exists")
            } else {
                const newBook = new Book({
                    author: author, 
                    title: bookTitle, 
                    notes: bookNotesArray
                })
                console.log("Book saved in Mongoose")
                await newBook.save()
            }
        })
    } catch(err) {
        console.log(err, "there is an error connecting to bookMongoose")
    }
}


catchDownloadedNote()

module.exports = {
    catchDownloadedNote, 
    parseBook
}
