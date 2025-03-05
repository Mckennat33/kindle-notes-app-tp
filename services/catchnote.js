
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
        watcher.on('add', async (path) => {
            if (path.endsWith(".tmp") || path.endsWith(".crdownload")) {
                return; 
            }
            if (path.endsWith('csv')) {
                try {
                    await parseBook(path)
                } catch(err) {
                    console.log("Error while parsing book:", err)
                }
            }  
        })
        
    } catch(err) {
        console.log(err)
    }
}

const parseBook = (path) => {
    const results = []
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            //console.log(results)
            const bookNotes = results.slice(7, results.length)
            const [{ "Your Kindle Notes For:": bookTitle }, { "Your Kindle Notes For:": author }] = results 
            const [{ "": notes }] = bookNotes
            const bookNotesArray = []
            bookNotes.map((notes) => {
                const {"": allNotes} = notes
                bookNotesArray.push(allNotes)
            })
            //console.log(bookNotesArray)
            const newBook = new Book({
                author: author, 
                title: bookTitle, 
                notes: bookNotesArray
            })
            console.log(newBook)
        })
}

catchDownloadedNote()

module.exports = {
    catchDownloadedNote
}
