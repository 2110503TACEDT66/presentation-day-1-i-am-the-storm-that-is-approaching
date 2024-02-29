const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    sessionDate:{
        type: Date,
        required: true,
        min: new Date('2022-05-10'), // Minimum allowed date
        max: new Date('2022-05-13'), // Maximum allowed date
        message: 'Session date must be between May 10th and May 13th, 2022.'
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    company:{
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});

module.exports=mongoose.model('Booking',BookingSchema);

