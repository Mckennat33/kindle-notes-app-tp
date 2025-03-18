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
                const jsonData = await response.json()
                if (response.ok) {
                    renderBookData(jsonData)
                } else {
                    console.log("Error from fetching User Data", response.status)
                }
            } catch(err) {
                console.log("there was an error", err.message)
            }
        }
        fetchData()
})

 
async function renderBookData(bookData) {
    const firstBook = bookData[0]
    const title = firstBook.title
    
    const bookTitle = document.querySelector('.book-title')
    const bookTitleDisplayLeft = document.querySelector('.title')
    bookTitleDisplayLeft.textContent = `${title}`
    bookTitle.textContent = `${title}`

    const author = firstBook.author
    const authorName = document.querySelector('.author')
    authorName.textContent = `${author}` 

    const notes = firstBook.notes
    const notesDiv = document.createElement('div')
    notesDiv.className = 'note'

    notes.forEach((note) => {
        const notesDiv = document.createElement('div')
        notesDiv.className = 'note'
        const noteSpan = document.createElement('span')
        noteSpan.className = 'page-number'
        // Need to update hard coded page number
        noteSpan.textContent = 'Page 7'

        const notePara = document.createElement('p')
        notePara.className = 'note-text'
        notePara.innerHTML = note

        notesDiv.append(noteSpan, notePara)
        document.querySelector('.notes').append(notesDiv);
    })    
}