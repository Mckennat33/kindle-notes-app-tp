// look at docs on how to use
const schedule = require('node-schedule');

// look at docs on how to use
const nodemailer = require('nodemailer')
const express = require('express')
const connectDB = require("../config/dbconn.js")
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const Books = require('../models/book.js')

// get all the notes from the database
// only grab 10 random notes from that array/object
// different 10 each day 
    // run that random 10 function each day 

async function getAllNotes() {
    try {
      await connectDB();
      const allNotes = await Books.find({}, 'notes'); // Find all books
      const allBooks = await Books.find()      
        const randomNotesArray = []

        allBooks.map((book) => {
          const { author, title, notes } = book;
          // const testArray = notes.slice(1, 5);

          for (let i = notes.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [notes[i], notes[r]] = [notes[r], notes[i]];
          }
        
          randomNotesArray.push({
            author, 
            title, 
            notes: notes
          })  

          // right now I am loggins all the notes.
          // we want to only send 10 notes to the random book functions
          console.log(randomNotesArray); 
        });



        // console.log(randomNotesArray)
  
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      await mongoose.connection.close(); // Close connection when done
    }
  }
  
  getAllNotes();
  