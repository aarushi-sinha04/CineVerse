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
        type: Schema.Types.ObjectId,
        ref: 'Seat',
        required: true,
        min: 1
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);