// look at docs on how to use
const schedule = require('node-schedule');

// look at docs on how to use
const nodemailer = require('nodemailer')
const express = require('express')
const connectDB = require("../config/dbconn.js")
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const Books = require('../models/book.js')


async function getAllNotes() {
    try {
      await connectDB();
  
      const allNotes = await Books.find({}, 'notes'); // Find all books
      console.log(allNotes);
  
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      await mongoose.connection.close(); // Close connection when done
    }
  }
  
  getAllNotes();
  