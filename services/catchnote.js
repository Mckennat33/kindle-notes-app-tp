
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
                                //const [{ "": notes }] = bookNotes
                                const bookNotesArray = []
                                bookNotes.map((notes) => {
                                    const {"": allNotes} = notes
                                    bookNotesArray.push(allNotes)
                                })
                                console.log(bookNotesArray[0])
                                //console.log(bookTitle, author, notes)
                            })
                    }
            }  
            parseBook(path)
        })
        
    } catch(err) {
        console.log(err)
    }
}

catchDownloadedNote()

module.exports = {
    catchDownloadedNote
}


