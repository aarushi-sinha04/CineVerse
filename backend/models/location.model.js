// like gurgaon, delhi, each place with many cinemas 

import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cinemas: [{
        type: Schema.Types.ObjectId,
        ref: 'Cinema'
    }]
})

export const Location = mongoose.model('Location', locationSchema);
