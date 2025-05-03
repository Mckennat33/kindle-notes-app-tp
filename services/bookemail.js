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
      // const bookObject = {
      //     author: author, 
      //     title: title,  
      //     notes: [
      //       'one note', 
      //       'two notes'
      //     ], 

      //   }
        const randomNotesArray = []
        allBooks.map((book) => {
          const { author, title, notes } = book

          for (let i = notes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            [notes[i], notes[j] = notes[j], notes[i]]
          }
          
          

          console.log(notes)
          // goal: get 10 notes from allBooks

        })



        // console.log(randomNotesArray)
  
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      await mongoose.connection.close(); // Close connection when done
    }
  }
  
  getAllNotes();
  