import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { Showtime } from "../models/showtime.model.js";
import { Seat } from "../models/seats.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const getBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let booking;

    if (id) {
        booking = await Booking.findById(id).populate({
            path: "showtime",
            select: "movie hall"  // Populate movie and hall inside showtime
        });
        
        if (!booking) {
            throw new ApiError(404, "Booking not found");
        }
    }
    else{
        booking = await Booking.find();
        if (booking.length === 0) {
            throw new ApiError(404, "No bookings found");
        }
    }

    

    return res.status(200).json(new ApiResponse(200, booking, "Bookings fetched successfully"));
});

const createBooking = asyncHandler(async (req, res) => {
    const { showtime, seats, user } = req.body;
    if (!showtime || !seats || !user || seats.length === 0) {
        throw new ApiError(400, "Showtime, user and at least one seat are required");
    }

    // to ensure atomicity, we will use transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Step 1: Check availability (all seats must be isBooked: false)
        // const availableSeatsCount = await Seat.countDocuments({
        //   _id: { $in: seats },
        //   showtime,
        //   isBooked: false
        // }).session(session);
    
        // if (availableSeatsCount !== seats.length) {
        //   throw new ApiError(400, "One or more seats are already booked");
        // }
    
        // Step 2: Mark seats as booked atomically
        await Seat.updateMany(
          { _id: { $in: seats }, showtime, isBooked: false },
          { $set: { isBooked: true, user: user } }
        ).session(session);
    
        // Step 3: Create booking record (assuming Booking model exists)
        const booking = new Booking({ showtime, seats, user: user });
        await booking.save({ session });
    
        await session.commitTransaction();
        session.endSession();
    
        return res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
});

const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) throw new ApiError(404, "Booking not found");

    await Booking.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, {}, "Booking deleted successfully"));
});

export { getBooking, createBooking, deleteBooking };
