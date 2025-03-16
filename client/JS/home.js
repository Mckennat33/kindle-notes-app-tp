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
    console.log(bookData)
    const firstBook = bookData[0]
    const title = firstBook.title
    console.log(title)
    const bookTitle = document.querySelector('.book-title')
    const bookTitleDisplayLeft = document.querySelector('.title')
    bookTitleDisplayLeft.textContent = `${title}`
    bookTitle.textContent = `${title}`

    const author = firstBook.author
    const authorName = document.querySelector('.author')
    authorName.textContent = `${author}` 

    const notes = firstBook.notes
    const notesSelector = document.querySelector('.note-text')
    notesSelector.textContent = `${notes[0]}`

}