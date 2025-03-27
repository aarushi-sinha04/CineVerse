import mongoose, { Schema } from 'mongoose';

const showtimeSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    time: {
        type: String,
        required: true
        
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
        type: Number, 
        required: true
    } 

});

export const Showtime = mongoose.model('Showtime', showtimeSchema);