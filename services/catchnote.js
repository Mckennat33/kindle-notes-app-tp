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

async function testBook() {
    // need to store that users id in the book schema so i can reference that later on.
    const findUser = await User.findOne({ })
    console.log(findUser._id)
}

testBook()


// const catchDownloadedNote = () => {
//     try {    
//         const watcher = chokidar.watch('C:/Users/thoma/Downloads', 
//             {
//                 persistent: true, 
//                 ignoreInitial: true
//             }
//         )
//         watcher.on('add', (path) => {
//             if (path.endsWith(".tmp") || path.endsWith(".crdownload")) {
//                 return; 
//             } else if (path.endsWith('csv')) {
//                 parseBook(path)
//             } else if (path.endsWith(".pdf")) {
//                 parsePdfBook(path)
//             }
//         })
        
//     } catch(err) {
//         console.log(err)
//     }
// }


// const parseBook = async (path) => {
//     const results = []
//     console.log(User)
//     try {
//         fs.createReadStream(path)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', async () => {
//             console.log(results)
//             const bookNotes = results.slice(7, results.length)
//             const [{ "Your Kindle Notes For:": bookTitle }, { "Your Kindle Notes For:": author }] = results 
//             console.log(bookTitle, author) // booktile and author are undefined 
//             const [{ "": notes }] = bookNotes
//             const bookNotesArray = []
//             bookNotes.map((notes) => {
//                 const {"": allNotes} = notes
//                 bookNotesArray.push(allNotes)
//             })

//             const matchingBook = await Book.findOne({title: bookTitle})
//             if (matchingBook) {
//                 console.log("Book already exists")

//             } else {
//                 const newBook = new Book({
//                     author: author, 
//                     title: bookTitle, 
//                     notes: bookNotesArray
//                 })
//                 console.log("Book saved in Mongoose")
//                 await newBook.save()
//             }
//         })
//     } catch(err) {
//         console.log(err, "there is an error connecting to bookMongoose")
//     }
// }


// const parsePdfBook = async (path) => {
//     try {

//         // try parsing data a differen way with try catch method 

//         let dataBuffer = fs.readFileSync(path)
//         pdf(dataBuffer).then(async (data) => {  
//             // console.log(data)
//             const { text } = data
//             // console.log(text)
//             const pdfNotes = text.split("Free")[1].split('|').slice(2)
//             const pdfTitle = text.split('Free')[0].split('by')[0].trim()
//             const pdfAuthor = text.split('Free')[0].split('by')[1]?.trim()
//             // const authorMatch = text.match(/by (.*?) Free/);
//             // const pdfAuthor = authorMatch ? authorMatch[1].trim() : null;
//             console.log(pdfAuthor, pdfTitle, pdfNotes)


//             // start of notes
//             // const matchingPdfBook = await Book.findOne({ title: pdfTitle }) 
//             // if (matchingPdfBook) {
//             //     console.log('PDF Book already exists')
//             // } else {
//             //     const pdfBook = new Book({
//             //         author: pdfAuthor, 
//             //         title: pdfTitle, 
//             //         notes: pdfNotes
//             //     })
//             //     await pdfBook.save() 
//             //     console.log("PDF Book saved in Mongoose")
//             // }
//         })
//     } catch (err) {
//         console.log(err.message)
//     }
// }

// catchDownloadedNote()

// module.exports = {
//     catchDownloadedNote, 
//     parseBook
// }

