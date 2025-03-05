const express = require('express')
const chokidar = require('chokidar')
const mongoose = require('mongoose')
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '../.env' });
const Book = require("../models/book.js")

// if book already exists in the database return error: book already exists. 

const catchDownloadedNote = () => {
    try {    
        const watcher = chokidar.watch('C:/Users/thoma/Downloads', 
            {
                persistent: true, 
                ignoreInitial: true
            }
        )
        watcher.on('add', async (path) => {
            if (path.endsWith(".tmp") || path.endsWith(".crdownload")) {
                return; 
            }
            if (path.endsWith('csv')) {
                try {
                    await parseBook(path)
                } catch(err) {
                    console.log("Error while parsing book:", err)
                }
            }  
        })
        
    } catch(err) {
        console.log(err)
    }
}

const parseBook = (path) => {
    const results = []
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            //console.log(results)
            const bookNotes = results.slice(7, results.length)
            const [{ "Your Kindle Notes For:": bookTitle }, { "Your Kindle Notes For:": author }] = results 
            const [{ "": notes }] = bookNotes
            const bookNotesArray = []
            bookNotes.map((notes) => {
                const {"": allNotes} = notes
                bookNotesArray.push(allNotes)
            })
            console.log(bookNotesArray[0])
            const newBook = new Book({
                author: author, 
                title: bookTitle, 
                notes: bookNotesArray
            })
            newBook.save()
        })
}

catchDownloadedNote()

module.exports = {
    catchDownloadedNote
}
