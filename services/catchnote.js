
const chokidar = require('chokidar')
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
                        console.log("Hello from the parser function", path)
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


