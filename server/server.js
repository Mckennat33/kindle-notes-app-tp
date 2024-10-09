const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console');
const { notStrictEqual } = require('assert');
const millionDollarWeekend = "/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv"
const howToBeFree = "/Users/thomasmckenna/Downloads/how-to-be-free.csv"
const friendsLoversAndTheBigTerribleThing = "/Users/thomasmckenna/Downloads/friends-lovers-and-the-big-terrible-thing-a-memoir.csv"


const books = [
  {path: '/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv', name:'millionDillorWeekend.csv'}, 
  //{path: '/Users/thomasmckenna/Downloads/dontbelieveeverythingyouthink.csv', name: 'dontBelieveEverythingYouThink.csv'}, 
  {path: "/Users/thomasmckenna/Downloads/how-to-be-free.csv", name: 'howToBeFree.csv'}, 
  //{path: '/Users/thomasmckenna/Downloads/thewaytolove.csv', name: 'theWayToLove.csv'}
]


books.forEach(book => formatBook(book))

function formatBook(book) {
  const bookPath = book.path
  const results = [];
  fs.createReadStream(bookPath)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const bookNotes = results.slice(7, results.length)
    const [{"Your Kindle Notes For:": bookTitle}, {"Your Kindle Notes For:": author}] = results

    const notes = bookNotes
    .slice(7)
    .filter(row => row["Your Kindle Notes For:"].startsWith("Highlight")) // Only get highlight rows
    .map(row => ({
      title: bookTitle,
      author: author,
      note: row[""] 
    }));
    
    tenRandomNotes(notes)

    createBookFile(notes)
  })
}


function createBookFile(bookNotes) {
  const stringNotes = JSON.stringify(bookNotes)
  fs.writeFile('booknotes.csv', stringNotes, (err) => {
    if (err) {
      console.log(err)
    } else {
      
    }
  })
}

function tenRandomNotes(bookNotes) {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}
  const example = [];
  shuffleArray(bookNotes);
  example.push(...bookNotes); 

  const randomTenNotes = example.slice(0,5); 

  console.log(randomTenNotes);
}

























// function readBookFile() {
//   const newResults = []
//   fs.createReadStream('./booknotes.csv')
//   .pipe(csvParser())
//   .on('data', (data) => newResults.push(data))
//   .on('end', () => {
//     console.log('we did it', newResults)
//   })
//   .on('error', (err) => {
//     console.log('error reading file:', err)
//   })
// }

// readBookFile()



