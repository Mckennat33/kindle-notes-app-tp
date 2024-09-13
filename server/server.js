const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console')
const millionDollarWeekend = "C:/Users/thoma/Downloads/milliondollarweekend.csv"; // Corrected path
const dontBelieveEverthingYouThink = "c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv"
const howToBeFree = "c:/Users/thoma/Downloads/howtobefree.csv"
const theWayToLove = "c:/Users/thoma/Downloads/thewaytolove.csv"


// 1. we want to put each book into its own csv file

// 2. We want to have a csv file with all our books highlighted notes. 


const results = [];
fs.createReadStream(theWayToLove)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const jsonResults = JSON.stringify(results, null, 2); 
    fs.writeFile('test.csv', jsonResults, (err) => {
      if (err) {
        console.log('Error writing to file:', err)
      } else {
        console.log("file written successfully")
      }
    })
  });

