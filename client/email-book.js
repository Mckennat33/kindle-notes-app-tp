const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console');
const { notStrictEqual } = require('assert');
const millionDollarWeekend = "C:/Users/thoma/Downloads/milliondollarweekend.csv"; // Corrected path
const dontBelieveEverthingYouThink = "c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv"
const howToBeFree = "c:/Users/thoma/Downloads/howtobefree.csv"
const theWayToLove = "c:/Users/thoma/Downloads/thewaytolove.csv"

// Restucture each book 
// Grab each book and put them in an individual file
// Put books all in one file
// Pull books from the all in file and 


const books = [
  {path: 'C:/Users/thoma/Downloads/milliondollarweekend.csv', name:'millionDillorWeekend.csv'}, 
  {path: 'c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv', name: 'dontBelieveEverythingYouThink.csv'}, 
  {path: 'c:/Users/thoma/Downloads/howtobefree.csv', name: 'howToBeFree.csv'}, 
  {path: 'c:/Users/thoma/Downloads/thewaytolove.csv', name: 'theWayToLove.csv'}
]

books.forEach(book => formatBook(book))
 
function formatBook(book) {
  const bookPath = book.path
  const results = [];
  fs.createReadStream(bookPath)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const newArray = results
    const test = results.slice(7, results.length)
    const [{"Your Kindle Notes For:": bookTitle}, {"Your Kindle Notes For:": author}] = results

    const notes = test
    .slice(7)
    .filter(row => row["Your Kindle Notes For:"].startsWith("Highlight")) // Only get highlight rows
    .map(row => ({
      title: bookTitle,
      author: author,
      note: row[""] // Extract the actual note content
    }));
    
    createBookFile(notes)
  })
}



function createBookFile(booknotes) {
  const stringNotes = JSON.stringify(booknotes)
  fs.writeFile('booknotes.csv', stringNotes, (err) => {
    if (err) {
      console.log('Error writing to file:', err)
    } else {
      console.log('file written successfully')
    }
  })
} 


