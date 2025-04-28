// look at docs on how to use
const schedule = require('node-schedule');

// look at docs on how to use
const nodemailer = require('nodemailer')
const express = require('express')
const connectDB = require("../config/dbconn.js")
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const Books = require('../models/book.js')


async function getAllBooks() {
    try {
      const allBooks = await Books.find();
      console.log(allBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  }
  
  getAllBooks();
  