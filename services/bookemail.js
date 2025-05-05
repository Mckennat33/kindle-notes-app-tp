
const schedule = require('node-schedule');
const express = require('express')
const connectDB = require("../config/dbconn.js")
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const Books = require('../models/book.js')
const nodemailer = require('nodemailer')

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

        // setting up email ten random notes

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com', 
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'thomasmckenna12@gmail.com ',
            pass: 'abcj zpwy bcwo ibvu',
          },
          tls: {
            rejectUnauthorized: false, // <== ADD THIS LINE
          },
        });

        (async () => {
          const info = await transporter.sendMail({
            from: 'thomasmckenna12@gmail.com',
            to: 'thomasmckenna12@gmail.com',
            subject: "Hello ✔",
            text: "Hello world?", // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
          });
        
          console.log("Message sent:", info.messageId);
        })();

    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      await mongoose.connection.close(); // Close connection when done
    }
  }
  
  getAllNotes();
  

