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
      const allBooks = await Books.find()      
      const allNotesWithBookInfo = []

        allBooks.forEach((book) => {
          const { author, title, notes } = book; 

          notes.forEach((note) => {
            allNotesWithBookInfo.push({
              author,
              title, 
              note
            })
          })
        })

        for (let i = allNotesWithBookInfo.length - 1; i > 0; i--) {
          const r = Math.floor(Math.random() * (i + 1));
          [allNotesWithBookInfo[i], allNotesWithBookInfo[r]] = [allNotesWithBookInfo[r], allNotesWithBookInfo[i]];
        }

        const tendRandomNotes = allNotesWithBookInfo.slice(0, 10)

        console.log(tendRandomNotes)
  
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      await mongoose.connection.close(); // Close connection when done
    }
  }
  
  getAllNotes();
  

  // Goal 
  // Get Ten random Notes with the author and title 
  // mapping through all the books
    // grabbing author title and notes 
      

  // Send an email with those notes to myself