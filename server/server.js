const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console');
const { notStrictEqual } = require('assert');
const millionDollarWeekend = "C:/Users/thoma/Downloads/milliondollarweekend.csv"; // Corrected path
const dontBelieveEverthingYouThink = "c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv"
const howToBeFree = "c:/Users/thoma/Downloads/howtobefree.csv"
const theWayToLove = "c:/Users/thoma/Downloads/thewaytolove.csv"


const books = [
  {path: 'C:/Users/thoma/Downloads/milliondollarweekend.csv', name:'millionDillorWeekend.csv'}, 
  {path: 'c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv', name: 'dontBelieveEverythingYouThink.csv'}, 
  {path: 'c:/Users/thoma/Downloads/howtobefree.csv', name: 'howToBeFree.csv'}, 
  {path: 'c:/Users/thoma/Downloads/thewaytolove.csv', name: 'theWayToLove.csv'}
]


books.forEach(book => formatBook(book))

// sending each book into formatBooks, so if I try to format it i need 
//to do it for each book 
function formatBook(book) {
  // this is overwriting booknotes.csv file with the last book in the array. We need to creat a unique path/name for each book
  // then we need to create a way to put them all in one. 
  //first we need to format them 
  const bookPath = book.path
  const results = [];
  fs.createReadStream(bookPath)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const newArray = results
    const test = results.slice(7, results.length)
    const [{"Your Kindle Notes For:": bookTitle}, {"Your Kindle Notes For:": author}] = results
    //const [,,,,,,,{"": notes}] = newArray

    const notes = test
    .slice(7)
    .filter(row => row["Your Kindle Notes For:"].startsWith("Highlight")) // Only get highlight rows
    .map(row => ({
      title: bookTitle,
      author: author,
      note: row[""] // Extract the actual note content
    }));
    console.log(notes)

  })
}



// book needs to be parsed before it can go through the formatBook function
function createBookFile() {
  fs.writeFile('booknotes.csv', jsonResults, (err) => {
    if (err) {
      console.log('Error writing to file:', err)
    } else {
      console.log("file written successfully")
    }
  })
}


function bookFile(books) {

}

function allBookFiles() {

}


