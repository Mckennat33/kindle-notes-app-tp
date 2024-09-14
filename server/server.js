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

const book = [
  {path: 'C:/Users/thoma/Downloads/milliondollarweekend.csv', name:'millionDillorWeekend.csv'}, 
  {path: 'c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv', name: 'dontBelieveEverythingYouThink.csv'}, 
  {path: 'c:/Users/thoma/Downloads/howtobefree.csv', name: 'howToBeFree.csv'}, 
  {path: 'c:/Users/thoma/Downloads/thewaytolove.csv', name: 'theWayToLove.csv'}
]


// book needs to be parsed before it can go through the formatBook function
function formatBook(book) {
  console.log(book)
}

formatBook(book)

function bookFile() {

}

function allBookFiles() {

}

const results = [];
fs.createReadStream(theWayToLove)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const jsonResults = JSON.stringify(results, null, 2); 
    console.log(jsonResults)
    fs.writeFile('booknotes.csv', jsonResults, (err) => {
      if (err) {
        console.log('Error writing to file:', err)
      } else {
        console.log("file written successfully")
      }
    })
  });


 