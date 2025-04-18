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


const parsePdfBook = async (path) => {
    try {

        // try parsing data a differen way with try catch method 

        let dataBuffer = fs.readFileSync(path)
        pdf(dataBuffer).then(async (data) => {  
            // console.log(data)
            const { text } = data
            // console.log(text)
            const pdfNotes = text.split("Free")[1].split('|').slice(2)
            const pdfTitle = text.split('Free')[0].split('by')[0].trim()
            const pdfAuthor = text.split('Free')[0].split('by')[1]?.trim()
            // const authorMatch = text.match(/by (.*?) Free/);
            // const pdfAuthor = authorMatch ? authorMatch[1].trim() : null;
            console.log(pdfAuthor, pdfTitle, pdfNotes)

            // const matchingPdfBook = await Book.findOne({ title: pdfTitle }) 
            // if (matchingPdfBook) {
            //     console.log('PDF Book already exists')
            // } else {
            //     const pdfBook = new Book({
            //         author: pdfAuthor, 
            //         title: pdfTitle, 
            //         notes: pdfNotes
            //     })
            //     await pdfBook.save() 
            //     console.log("PDF Book saved in Mongoose")
            // }
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


// Live your truth
// Dont believe everything you think
// Never Finished 
// The way to love
// Between the world and me
// How to be free
// Friends lovers and the big terrible thing