// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true, // Ensure this field is required
    },
    lastname: {
        type: String,
        required: true, // Ensure this field is required
    },
    email: {
        type: String,
        required: true, // Ensure this field is required
        unique: true,   // Ensure that email is unique
    },
    password: {
        type: String,
        required: true, // Ensure this field is required
    },
    // Add any other fields if necessary
}, { timestamps: true }); // This will automatically add createdAt and updatedAt timestamps

module.exports= mongoose.model('Users', userSchema);


