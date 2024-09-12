const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console')
const millionDollarWeekend = "C:/Users/thoma/Downloads/milliondollarweekend.csv"; // Corrected path
const dontBelieveEverthingYouThink = "c:/Users/thoma/Downloads/dontbelieveeverythingyouthink.csv"

const results = [];
fs.createReadStream(dontBelieveEverthingYouThink)
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

