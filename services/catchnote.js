const express = require('express')
const chokidar = require('chokidar')
const mongoose = require('mongoose')
const csv = require('csv-parser')
const app = express() 
const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse');
require('dotenv').config({ path: '../.env' });
app.use(express.json())
const Book = require("../models/book.js")
const User = require("../models/user.js")
const connectDB = require("../config/dbconn.js");
connectDB()

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
            } else if (path.endsWith('csv')) {
                parseBook(path)
            } else if (path.endsWith(".pdf")) {
                parsePdfBook(path)
            }
        })
        
    } catch(err) {
        console.log(err)
    }
}

const parseBook = async (path) => {
    const results = []
    console.log(User)
    try {
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(results)
            const bookNotes = results.slice(7, results.length)
            const [{ "Your Kindle Notes For:": bookTitle }, { "Your Kindle Notes For:": author }] = results 
            const [{ "": notes }] = bookNotes
            const bookNotesArray = []
            bookNotes.map((notes) => {
                const {"": allNotes} = notes
                bookNotesArray.push(allNotes)
            })

            const matchingBook = await Book.findOne({ title: bookTitle })
            if (matchingBook) {
                console.log("Book already exists")

            } else {
                // before saving newBook we need to add the users id when we save
                const newBook = new Book({
                    author: author, 
                    title: bookTitle, 
                    notes: bookNotesArray
                    // Users ID - How to add Id variable 
                })
                console.log("Book saved in Mongoose")
                await newBook.save()
            }
        })
    } catch(err) {
        console.log(err, "there is an error connecting to bookMongoose")
    }
}


const parsePdfBook = async (path) => {
    try {
        let dataBuffer = fs.readFileSync(path)
        pdf(dataBuffer).then(async (data) => {  
            const { text } = data
            const pdfTitle = text.split('1')[1].split('by')[0]
            const pdfAuthor = text.split('1')[1].split('by')[1].split('Free')[0]
            const passedNotes = text.split('Page').slice(1); 
            const cleanedNotes = passedNotes.map(note =>
                note
                .replace(/^\s*\d+\s*$/gm, '')     // Removes lines that contain only a number, with optional spaces
                .replace(/^\s*\|\s*/gm, '')       // Remove leading pipes and spaces
                .replace(/Highlight\s*/gi, '')    // Remove "Highlight"
                .replace(/\([^)]+\)/g, '')        // Remove anything in parentheses
                .replace(/,\s*\d+\n?/g, '')
                .replace(/^\s*\|\s*/gm, '')   
                .replace(/\+/g, '')    
                .trim()                  
            ).filter(note => note.length > 0)

            const pdfNotes = cleanedNotes.toString()

            // need to ref: 'Author' to connect different models in mongoose 
            const matchingPdfBook = await Book.findOne({ title: pdfTitle }) 
            if (matchingPdfBook) {
                console.log('PDF Book already exists')
            } else {
                const pdfBook = new Book({
                    author: pdfAuthor, 
                    title: pdfTitle, 
                    notes: cleanedNotes
                    // Users ID - How to add Id variable 

                })
                await pdfBook.save() 
                console.log("PDF Book saved in Mongoose")
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}

catchDownloadedNote()

module.exports = {
    catchDownloadedNote, 
    parseBook
}

