const express = require('express')
const path = require('path')

const addBook = async (req, res) => {
    const {title, author, notes} = req.body
    console.log(req.body)
    console.log(title, author, notes)
    console.log('this worked from the front end')
}

module.exports = {
    addBook
}