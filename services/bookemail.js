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

        allBooks.map((book) => {
          console.log(book.author)
        })

        

  
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      await mongoose.connection.close(); // Close connection when done
    }
  }
  
  getAllNotes();
  