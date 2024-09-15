const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console')
const millionDollarWeekend = "C:/Users/thoma/Downloads/milliondollarweekend.csv"; // Corrected path
const dontBelieveEverthingYouThink = "c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv"
const howToBeFree = "c:/Users/thoma/Downloads/howtobefree.csv"
const theWayToLove = "c:/Users/thoma/Downloads/thewaytolove.csv"

// 1. we want to put each book into its own csv file, we also want to have a csv file with all our books highlighted notes. 
// 2. need to put each book into a data structure so we can loop through them
// I need to parse the notes before I can sent it through the format function 


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
    
    //const bookNotes = results.slice(7)
    const [{"Your Kindle Notes For:": book}, {"Your Kindle Notes For:": author},,,,,,  {"": notes} ] = results
    console.log(notes)
    // const [, {"Your Kindle Notes For:": author}] = results
    // const [,,,,,,,{"": notes}] = results
    
    

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


function bookFile() {

}

function allBookFiles() {

}


