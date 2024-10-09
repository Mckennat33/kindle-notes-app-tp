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

function formatBook(book) {
  const bookPath = book.path
  const results = [];
  fs.createReadStream(bookPath)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const bookNotes = results.slice(7, results.length)
    const [{"Your Kindle Notes For:": bookTitle}, {"Your Kindle Notes For:": author}] = results

    const notes = bookNotes
    .slice(7)
    .filter(row => row["Your Kindle Notes For:"].startsWith("Highlight")) // Only get highlight rows
    .map(row => ({
      title: bookTitle,
      author: author,
      note: row[""] // Extract the actual note content
    }));
    writeFile(notes)
  })  
}

module.exports = { formatBook }

function writeFile(booknotes) {
    const stringNotes = JSON.stringify(booknotes)
    fs.writeFile('test.csv', stringNotes, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Filewritten successfully`)
      }
    })
    
  }

  
  function readFiles() {
    const newResults = [];
    fs.createReadStream('test.csv')
      .pipe(csvParser())
      .on('data', (data) => newResults.push(data)) // Push each row of CSV into results
      .on('end', () => {
        console.log('we did it', newResults); // Output the parsed CSV as an array of objects
      })
      .on('error', (err) => {
        console.error('Error reading file:', err); // Handle errors
      });
  }
  
  readFiles();




// const createCsvFile = require('csv-writer').createObjectCsvWriter
// const csvWriter = createCsvFile({
//   path: "allBookNotes.csv", 
//   header: [
//     {id: 'title', title: 'Title'},
//     {id: 'author', title: 'Author'},
//     {id: 'note', title: 'Note'},
//   ]
// })

// csvWriter.writeRecords(notes)
//   .then(() => {
//     console.log(`File written for ${bookTitle}`)
//   })
//   .catch(err => {
//     console.log("error writing CSV:", err)
//   })
