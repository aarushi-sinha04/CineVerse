import mongoose, { Schema} from "mongoose";

const seatSchema = new Schema({
    row: {
        type: String,
        required: true,
        enum : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        index: true
    },
    number: {
        type: Number,
        required: true,
        min: 1,
        max: 14,
        index: true
    },
    showtime: {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true,
        index: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
});
export const Seat = mongoose.model('Seat', seatSchema);