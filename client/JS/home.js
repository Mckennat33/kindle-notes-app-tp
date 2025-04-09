

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
                // renderTitles(jsonBookData)
                
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
authorName.className = 'author-top'
authorName.innerHTML = `${author}` 

const title = firstBook.title
const firstTitleSelect = document.querySelector('.book-title')
firstTitleSelect.className = 'title-top'
firstTitleSelect.innerHTML = `YOU KINDLE NOTES FOR: ${title}`

const notes = firstBook.notes
const notesDiv = document.createElement('div')
notesDiv.className = 'note'

notes.forEach((note, index) => {
    const notesDiv = document.createElement('div')
    notesDiv.className = 'note'

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

    notesDiv.append(notePara, pinBttn)
    document.querySelector('.notes').append(notesDiv);
})    


function renderTitles(bookData) {
for (let i = 0; i < bookData.length; i++) {
    const bookTitle = bookData[i].title
    const selectedBookInfo = bookData[i]

    const bookTitleButton = document.createElement('button')
    bookTitleButton.className = `title`
    bookTitleButton.innerText = bookTitle

    bookTitleButton.addEventListener('click', () => {
        const allNotesWrapper = document.createElement('div')
        allNotesWrapper.className = 'notes'

        // DISPLAYING AUTHOR AND TITLE TO HOME PAGE
        const selectedBooktitle = selectedBookInfo.title
        const selectedBookAuthor = selectedBookInfo.author

        const newTitle = document.createElement('p')
        newTitle.className = 'new-title'
        newTitle.innerHTML = `${selectedBooktitle}`

        console.log(newTitle)
        // document.querySelector('.book-top').replaceWith(newTitle)
        // document.querySelector('.author').replaceWith(selectedBookAuthor)

        const bookNotes = selectedBookInfo.notes
            bookNotes.forEach((newNote, newIndex) => {

                const newNoteDiv = document.createElement('div')
                newNoteDiv.className = 'note'

                const newNotePara = document.createElement('p')
                newNotePara.className = 'new-note' // add a unique class name
                newNotePara.dataset.index = newIndex
                newNotePara.innerText = newNote

                const pinBttn = document.createElement('button')
                pinBttn.addEventListener('click', () => {
                    const pickedNoteClass = document.querySelector(`[data-index="${newIndex}"]`) 
                    const pickedNote = pickedNoteClass.innerText // was innerhtml
                    
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
                pinBttn.innerText = "Pin Note"

                // newNotePara.append(pinBttn)
                newNoteDiv.append(newNotePara, pinBttn)

                allNotesWrapper.append(newNoteDiv)

            })

        const firstNoteDiv = document.querySelector('.notes')
        if (firstNoteDiv) {
            document.querySelector('.notes').replaceWith(allNotesWrapper)
        } else {
            document.querySelector('.test-notes').replaceWith(allNotesWrapper)
        }

        })

    document.querySelector('.list').append(bookTitleButton)
  }
}
renderTitles(bookData)
}