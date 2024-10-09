
const fs = require('fs')
const csvParser = require('csv-parser')
const { error } = require('console');
const { notStrictEqual } = require('assert');
const millionDollarWeekend = "/Users/thomasmckenna/Downloads/Million-Dollar-Weekend-Notes.csv"
const howToBeFree = "/Users/thomasmckenna/Downloads/how-to-be-free.csv"
const friendsLoversAndTheBigTerribleThing = "/Users/thomasmckenna/Downloads/friends-lovers-and-the-big-terrible-thing-a-memoir.csv"




function readBookFile() {
    const newResults = []
    fs.createReadStream('/Users/thomasmckenna/kindle-notes-app-tp/server/allBookNotes.csv')
    .pipe(csvParser())
    .on('data', (data) => newResults.push(data))
    .on('end', () => {
      console.log('we did it', newResults)
    })
    .on('error', (err) => {
      console.log('error reading file:', err)
    })
  }
  
  readBookFile()