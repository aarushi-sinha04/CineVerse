import mongoose, { Schema } from "mongoose";

const cinemaSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    location:{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    hall: [{
        type: Schema.Types.ObjectId,
        ref: 'Hall'
    }]

})

export const Cinema = mongoose.model('Cinema', cinemaSchema);