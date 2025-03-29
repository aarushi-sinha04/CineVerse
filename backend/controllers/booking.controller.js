import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { Showtime } from "../models/showtime.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const getBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let bookingQuery = Booking.find();

    if (id) {
        bookingQuery = bookingQuery.findById(id);
    }

    bookingQuery = bookingQuery.populate({
        path: "showtime",
        populate: [
            { path: "movie", select: "title" },
            { path: "hall", populate: { path: "cinema", select: "name location" } }
        ]
    });

    const booking = await bookingQuery;

    if (!booking || (Array.isArray(booking) && booking.length === 0)) {
        throw new ApiError(404, id ? "Booking not found" : "No bookings found");
    }

    console.log("Populated Booking Data:", booking); // Debugging

    return res.status(200).json(new ApiResponse(200, booking, "Bookings fetched successfully"));
});


const createBooking = asyncHandler(async (req, res) => {
    const { showtime, seats } = req.body;
    if (!showtime || !seats) throw new ApiError(400, "Showtime and seats are required");

    const showtimeExists = await Showtime.findById(showtime);
    if (!showtimeExists) throw new ApiError(404, "Showtime not found");

    const { availableSeats, bookedSeats } = showtimeExists;
    if (!seats.every(seat => availableSeats.includes(seat))) {
        throw new ApiError(400, "One or more seats are not available");
    }

    const updatedAvailableSeats = availableSeats.filter(seat => !seats.includes(seat));
    const updatedBookedSeats = [...bookedSeats, ...seats];

    await Showtime.findByIdAndUpdate(showtime, {
        availableSeats: updatedAvailableSeats,
        bookedSeats: updatedBookedSeats
    }, { new: true });

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
