
const schedule = require('node-schedule');
const express = require('express')
const connectDB = require("../config/dbconn.js")
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });
const Books = require('../models/book.js')
const nodemailer = require('nodemailer')
const cron = require('node-cron');
const moment = require('moment');
// const express = require('express');
const app = express();

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

        const tendRandomNotes = allNotesWithBookInfo.slice(0, 10).map(note => 
          `Title: ${note.title}<br>Author: ${note.author}<br>Note: ${note.note}<br><br>`
        ).join('');

 
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com', 
          port: 587,
          secure: false, 
          auth: {
            user: 'thomasmckenna12@gmail.com ',
          pass: 'abcj zpwy bcwo ibvu',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      

      const emailNotes = async () => {
        const tendRandomNotes = allNotesWithBookInfo.slice(0, 10).map(note => 
          `
            <div style="
              background-color: #ffffff;
              padding: 16px;
              margin-bottom: 16px;
              border-left: 6px solid #4a90e2;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            ">
              <h3 style="margin: 0 0 8px; font-size: 18px; color: #2c3e50;">${note.title}</h3>
              <p style="margin: 0 0 6px; color: #555;"><strong>Author:</strong> ${note.author}</p>
              <p style="margin: 0; color: #333;"><strong>Note:</strong> ${note.note}</p>
            </div>
          `
        ).join('');
      
        const htmlContent = `
          <html>
            <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <div style="
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              ">
                <h2 style="
                  text-align: center;
                  color: #4a90e2;
                  margin-bottom: 24px;
                ">📘 Your Daily Kindle Notes</h2>
      
                ${tendRandomNotes}
      
                <p style="text-align: center; font-size: 13px; color: #888; margin-top: 32px;">
                  Sent from your Kindle Notes App
                </p>
              </div>
            </body>
          </html>
        `;
      
        const info = await transporter.sendMail({
          from: 'thomasmckenna12@gmail.com',
          to: 'thomasmckenna12@gmail.com',
          subject: "📘 Your Daily Kindle Notes",
          html: htmlContent,
        });
      
        console.log("Message sent:", info.messageId);
      }

      //'30 6 * * *'
      function timeEmail() {
        cron.schedule('30 6 * * *', () => {
          // console.log('Email sent at', moment().tz('America/Chicago').format());
          emailNotes();
        }, {
          scheduled: true,
          timezone: 'America/Chicago'
        });
      }
    
      timeEmail();
    
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  
  }
  
  getAllNotes();
  


