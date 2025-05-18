const fs = require('fs')
const csvParser = require('csv-parser')
const { FeedUser } = require('semantic-ui-react')
const { error } = require('console');
const { notStrictEqual } = require('assert');
const schedule = require('node-schedule')
const millionDollarWeekend = "/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv"
const howToBeFree = "/Users/thomasmckenna/Downloads/how-to-be-free.csv"
const friendsLoversAndTheBigTerribleThing = "/Users/thomasmckenna/Downloads/friends-lovers-and-the-big-terrible-thing-a-memoir.csv"
const nodemailer = require('nodemailer')

const books = [
  {path: '/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv', name:'millionDillorWeekend.csv'}, 
  {path: "/Users/thomasmckenna/Downloads/how-to-be-free.csv", name: 'howToBeFree.csv'}, 
  {path: "/Users/thomasmckenna/Downloads/friends-lovers-and-the-big-terrible-thing.csv", name: "friendsLoversAndTheBigTerribleThing.csv"},
  {path: "/Users/thomasmckenna/Downloads/never-finished.csv", name: "neverFinished.csv"},
  {path: "/Users/thomasmckenna/Downloads/live-your-truth.csv", name: "liveYourTruth.csv"},
  {path: "/Users/thomasmckenna/Downloads/ between-the-world-and-me.csv", name: "betweenTheWorldAndMe.csv"},
  {path: "/Users/thomasmckenna/Downloads/dont-believe-everything-you-think.csv", name: "dontBelieveEverythingYouThink.csv"}
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
    .filter(row => row["Your Kindle Notes For:"].startsWith("Highlight")) 
    .map(row => ({
      title: bookTitle,
      author: author,
      note: row[""] 
    }));
    //tenRandomNotes(notes)
    createBookFile(notes)
    scheduleNotesEmail(notes)
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

function scheduleNotesEmail(notes) {
    schedule.scheduleJob('*/1 * * * *', () => {
      return emailTenRandomNotes(notes), new Date().toLocaleTimeString(); 
    });
}

function emailTenRandomNotes(bookNotes) {
  const example = [];
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    
    example.push(...bookNotes); 
}
  shuffleArray(bookNotes);
  const randomTenNotes = example.slice(0,5); 
  emailNotes(randomTenNotes)
}

function emailNotes(randomTenNotes) {
  let formattedNotes = randomTenNotes.map(note => 
    `Title: ${note.title}\nAuthor: ${note.author}\nNote: ${note.note}\n`
  ).join('\n')
  // starter code for email
  // sending emails
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587,
    secure: false, // use SSL
    auth: {
        user: 'thomasmckenna12@gmail.com ',
        pass: 'abcj zpwy bcwo ibvu',
    }
  });  

  // Configure the mailoptions object
  const mailOptions = {
    from: 'thomasmckenna12@gmail.com',
    to: 'thomasmckenna12@gmail.com',
    subject: `Notes for ${randomTenNotes[0].title}`, // this will be a variable
    text: formattedNotes,
    //JSON.stringify(randomTenNotes, null, 2),  // this will be a variable - also cant be an array
    attachments: [
        {
            // filename: 'hightlights.txt', 
            // path: noteFile,
        }
    ]
  };

  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
  });

}


// input field for author, title and notes




















