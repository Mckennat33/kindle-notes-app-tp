const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true, 
        lowercase: true, 
        valdate: {
            validator: validator.isEmail, 
            message: 'Invalid email format'
        }
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 8
    },
    dateJoined: {
        type: Date, 
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User; 

