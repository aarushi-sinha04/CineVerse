import mongoose, {Schema} from "mongoose";

const bookingSchema = new Schema({
    // userID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
        
    // },
    
    showtime: {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    seats: [{
        type: Number,
        required: true,
        min: 1
    }]
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);