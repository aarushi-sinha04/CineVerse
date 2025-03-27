import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "customer"], // Ensures only valid roles
        default: "customer"
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);