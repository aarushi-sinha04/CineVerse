import mongoose, { Schema } from 'mongoose';

const showtimeSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
        index: true // Improves query performance
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true,
        index: true
    },
    startTime: { // More descriptive than just "time"
        type: String,
        required: true
    },
    endTime: { // Useful for scheduling
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
        type: [Number], // Store available seat numbers
        required: true
    },
    bookedSeats: { 
        type: [Number], 
        default: [],
        validate: {
            validator: function (value) {
                return value.length <= this.availableSeats.length;
            },
            message: "Booked seats cannot exceed available seats."
        }
    }
});

export const Showtime = mongoose.model('Showtime', showtimeSchema);
