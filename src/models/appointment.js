const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ['Cardiology', 'Neurology', 'Dermatology', 'General Medicine', 'Pediatrics','Orthopedics'] // Example departments
    },
    doctor: {
        type: String,
        required: true,
        enum: ['Dr. Harshil Patel', 'Dr. Gagandeep Singh', 'Dr. Divyam Gupta', 'Dr. Tuhin Ghosh', 'Dr. Sahil Achhava']
    },
    appointmentDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= new Date(); // Ensure the date is not in the past
            },
            message: 'Appointment date cannot be in the past'
        }
    },
    appointmentTime: {
        type: String,
        required: true,
        enum: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] // Example available times
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

