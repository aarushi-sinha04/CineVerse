import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { Showtime } from "../models/showtime.model.js";
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
    const { showtime, seats } = req.body;
    if (!showtime || !seats || seats.length === 0) {
        throw new ApiError(400, "Showtime and at least one seat are required");
    }

    // Use atomic update to ensure seat availability before booking
    const updatedShowtime = await Showtime.findOneAndUpdate(
        { _id: showtime, availableSeats: { $all: seats } }, // Ensure all seats are available
        { 
            $pull: { availableSeats: { $in: seats } }, // Remove from available
            $push: { bookedSeats: { $each: seats } }  // Add to booked
        },
        { new: true }
    );

    if (!updatedShowtime) {
        throw new ApiError(400, "One or more seats were just booked by someone else");
    }

    // Create and save booking
    const booking = new Booking({ showtime, seats });
    await booking.save();

    return res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});


const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) throw new ApiError(404, "Booking not found");

    await Booking.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, {}, "Booking deleted successfully"));
});

export { getBooking, createBooking, deleteBooking };
