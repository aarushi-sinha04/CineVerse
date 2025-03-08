import mongoose, { Schema } from "mongoose";

const hallSchema = new Schema({
    screenNumber:{
        type: String,
        required: true,
        unique: true
    },
    cinema:{
        type: Schema.Types.ObjectId,
        ref: 'Cinema'
    },
    showtime: [{
        type: Schema.Types.ObjectId,
        ref: 'Showtime'
    }],
    totalseats: {
        type: Number,
        required: true
    }

})

export const Hall = mongoose.model('Hall', hallSchema);