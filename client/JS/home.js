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
                    // if I take out renderBookData - it will render titles
                    // May be an issue because of the PDF data. 
                    renderBookData(jsonBookData)
                    renderTitles(jsonBookData)
                    console.log(jsonBookData)
                } else {
                    console.log("Error from fetching User Data", response.status)
                }
            } catch(err) {
                console.log("there was an error", err.message)
            }
        }
        fetchData()
})
 
function renderBookData(bookData) {
    const firstBook = bookData[0]

    const author = firstBook.author
    const authorName = document.querySelector('.author')
    authorName.innerHTML = `${author}` 

    const notes = firstBook.notes
    const notesDiv = document.createElement('div')
    notesDiv.className = 'note'

    notes.forEach((note, index) => {
        const notesDiv = document.createElement('div')
        notesDiv.className = 'note'
        const noteSpan = document.createElement('span')
        noteSpan.className = 'page-number'

        const notePara = document.createElement('p')
        notePara.className = 'note-text' // add a unique class name
        notePara.dataset.index = index
        notePara.innerHTML = note

        const pinBttn = document.createElement('button')
        pinBttn.addEventListener('click', () => {
            const pickedNoteClass = document.querySelector(`[data-index="${index}"]`) 
            const pickedNote = pickedNoteClass.innerHTML
            
            const pinnedDiv = document.querySelector('.pin-note')
            const pinnedNote = document.createElement('p')
            pinnedNote.className = 'pinned-note'
            pinnedNote.innerText = pickedNote

            const deletePinBttn = document.createElement('button')
            deletePinBttn.className = 'del-pin-bttn'
            deletePinBttn.innerText = "Remove Pin"
            deletePinBttn.addEventListener('click', () => {
                // Do I want to add a line in between the notes that are pinned? 
                const removePinnedNote = document.querySelector(".pinned-note")
                removePinnedNote.remove()
            })

            pinnedNote.append(deletePinBttn)
            pinnedDiv.append(pinnedNote)

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

