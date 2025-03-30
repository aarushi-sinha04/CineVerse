// movie name

import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall'
    },
    showtimes: [{
        type: Schema.Types.ObjectId,
        ref: 'Showtime'
    }],
    verticalPoster: {
        type: String,
        required: true
    },
    horizontalPoster: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    }
    

})

export const Movie = mongoose.model('Movie', movieSchema);