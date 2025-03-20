// const { NotBeforeError } = require("jsonwebtoken")

document.addEventListener('DOMContentLoaded', () => {
        const fetchUserData = "http://localhost:80/home/data"
        async function fetchData() {
            try {   
                const response = await fetch(fetchUserData, {
                    method: 'GET', 
                    credentials: 'include', 
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const jsonBookData = await response.json()
                if (response.ok) {
                    renderBookData(jsonBookData)
                    renderTitles(jsonBookData)
                } else {
                    console.log("Error from fetching User Data", response.status)
                }
            } catch(err) {
                console.log("there was an error", err.message)
            }
        }
        fetchData()
})


// Live your truth
// Dont believe everything you think
// Never Finished 
// The way to love
// Between the world and me
// How to be free
// Friends lovers and the big terrible thing
 
function renderBookData(bookData) {
    const firstBook = bookData[0]

    const author = firstBook.author
    const authorName = document.querySelector('.author')
    authorName.innerHTML = `${author}` 

    const notes = firstBook.notes
    const notesDiv = document.createElement('div')
    notesDiv.className = 'note'

    notes.forEach((note) => {
        const notesDiv = document.createElement('div')
        notesDiv.className = 'note'
        const noteSpan = document.createElement('span')
        noteSpan.className = 'page-number'

        const notePara = document.createElement('p')
        notePara.className = 'note-text'
        notePara.innerHTML = note

        const pinBttn = document.createElement('button').addEventListener('click', function() {
            // take the note
            // pin that note to the top 
        })
        pinBttn.className = 'pin-button'
        pinBttn.innerHTML = 'Pin Note'

        notesDiv.append(noteSpan, notePara, pinBttn)
        document.querySelector('.notes').append(notesDiv);
    })    
}

function renderTitles(bookData) {
    for (let i = 0; i < bookData.length; i++) {
        const bookTitle = bookData[i].title
        const bookTitleButton = document.createElement('button')
        bookTitleButton.className = 'title'
        bookTitleButton.innerText = bookTitle

        document.querySelector('.list').append(bookTitleButton)
      }
}

