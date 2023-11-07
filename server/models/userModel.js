const mongoose = require('mongoose');

// Schema
const userSchema = mongoose.Schema({
    // email, password
    email: { 
        type: String, 
        required: [true, "Please provide an email address!"], 
        unique: [true, "User with email address already exists"]},

    password: { 
        type: String, 
        required: [true, "Please provide a password"],
        unique: [false]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);