function addManualBook() {
    const manualBook = document.querySelector('.add-book')
    manualBook.addEventListener('click', () => {
    console.log('add book button')
    const popUpContainer = document.querySelector('.pop-container')

    const popUp = document.querySelector('.pop-form')

    popUpContainer.style.display = 'flex'
    
    const exitBttn = document.querySelector('.exit-button')
    exitBttn.addEventListener('click', (e) => {
        e.preventDefault()
        popUpContainer.style.display = 'none'

    })

   
})

// Book Form Function
const submitBook = document.querySelector('.pop-form')
const submitManualBook = "http://localhost:80/home/submit"
submitBook.addEventListener('submit', (event) => {
    console.log(event)
    event.preventDefault()
    const manAuthor = document.getElementById('author').value
    const manTitle = document.getElementById('title').value
    const manNotes = document.getElementById('notes').value

    const manualBook = {
        "author": manAuthor, 
        "title": manTitle, 
        "notes": manNotes
    }
    // alert('success')
    fetch(submitManualBook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(manualBook)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success', data)
        document.getElementById('notes').value = ''
        
    })
    .catch(err => {
        console.error("Error", err)
    })
})

} 

addManualBook()