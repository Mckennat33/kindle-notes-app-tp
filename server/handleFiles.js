const { formatBook } = require('./server.js')
const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console');
const { notStrictEqual } = require('assert');
const { create } = require('domain');
const millionDollarWeekend = "/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv"; // Corrected path
const howToBeFree = "/Users/thomasmckenna/Downloads/how-to-be-free.csv"



const books = [
  {path: "/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv", name:'millionDillorWeekend.csv'}, 
  {path: "/Users/thomasmckenna/Downloads/how-to-be-free.csv", name: 'howToBeFree.csv'}, 
]

books.forEach(book => formatBook(book))

// maybe I can import the function but not the actual

formatBook()

// function writeFile(booknotes) {
//     const stringNotes = JSON.stringify(booknotes)
//     fs.writeFile('test.csv', stringNotes, (err) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log('success')
//       }
//     })
//   }

//   writeFile()