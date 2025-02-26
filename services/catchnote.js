
const chokidar = require('chokidar')
const csv = require('csv-parser')
const fs = require('fs')
const Book = require("../models/book.js")


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
            }
            const newFile = path.split('.').pop()
            if (newFile === 'csv') {
                    function parseBook(path) {
                        const results = []
                        fs.createReadStream(path)
                            .pipe(csv())
                            .on('data', (data) => results.push(data))
                            .on('end', () => {
                                //console.log(results)
                                const bookNotes = results.slice(7, results.length)
                                const [{ "Your Kindle Notes For:": bookTitle }, { "Your Kindle Notes For:": author }] = results 
                                console.log(bookTitle, author, bookNotes)
                            })
                    }
            }  
            // get path of book
            // name the path for each book based on the title/author
            // put that data in an array. 
            // send array into into a readstream 
            parseBook(path)
            // put that data into our mongoose database

        })
        
    } catch(err) {
        console.log(err)
    }
}

catchDownloadedNote()

module.exports = {
    catchDownloadedNote
}


