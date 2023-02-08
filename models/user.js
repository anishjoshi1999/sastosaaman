const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv").config()
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: [true, 'Username cannot be blank']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'email cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    contactNumber: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

// Mongoose Middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.contactNumber = await bcrypt.hash(this.contactNumber, 12)
    this.email = await bcrypt.hash(this.email, 12)
    this.createdAt = Date.now()
    next()
})
module.exports = mongoose.model('User', userSchema)