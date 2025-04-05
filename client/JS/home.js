// const { NotBeforeError } = require("jsonwebtoken")

// const { AccordionTitle } = require("semantic-ui-react")

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

            // maybe add a div up (without anything attached) then add the new-notes to this div. so i am not creating a div for each? 
        bookTitleButton.addEventListener('click', () => {
                const bookNotes = selectedBookInfo.notes
                console.log(bookNotes.length)
                // if the notes length is larger than the previous note then we need to add a div and append
                bookNotes.forEach((newNote, newIndex) => {
                    const newNoteDiv = document.createElement('div')
                    newNoteDiv.className = 'new-notes-div'

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
                    pinBttn.innerHTML  = "Pin Note"

                    newNotePara.append(pinBttn)
                    newNoteDiv.append(newNotePara) // add pin bttn to div

                    const noteClassName = document.querySelector('.note')
                    const newNoteClassName = document.querySelector('.new-note')
                // need to make a div container for notes. 
                // add new notes to that div. 
                        // replace anything after that with new div. 
                    if (noteClassName) {
                        document.querySelector('.note').replaceWith(newNoteDiv)
                    } else if (newNoteClassName) {
                        // document.querySelector(`.new-notes-div-${newIndex}`).replaceWith(newNoteDiv)
                        document.querySelector('.new-notes-div').replaceWith(newNotePara)
                    } else {
                        document.querySelector('.notes').append(newNoteDiv);
                    }
                })
            })

        document.querySelector('.list').append(bookTitleButton)
      }
}
    renderTitles(bookData)
}





