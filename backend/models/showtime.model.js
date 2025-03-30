import mongoose, { Schema } from 'mongoose';

const showtimeSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
        index: true
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true,
        index: true
    },
    startTime: { // Use Date if doing time calculations
        type: String,
        required: true
    },
    endTime: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableSeats: { 
        type: [Number], 
        required: true
    },
    bookedSeats: { 
        type: [Number], 
        default: []
    }
});

export const Showtime = mongoose.model('Showtime', showtimeSchema);
