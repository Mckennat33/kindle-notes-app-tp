const mongoose = require('mongoose')
const validator = require('validator')
const Joi = require('joi')

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

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    })
    return schema.validate(user)
}


const User = mongoose.model('User', userSchema)
module.exports.validate = validateUser

module.exports = User; 

