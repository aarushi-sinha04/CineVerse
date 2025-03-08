import mongoose, { Schema } from 'mongoose';

const showtimeSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall'
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
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

})

export const Showtime = mongoose.model('Showtime', showtimeSchema);