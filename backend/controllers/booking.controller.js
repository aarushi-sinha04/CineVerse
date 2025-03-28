import {ApiError }from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const getBooking = asyncHandler(async (req, res) => {
    const {id} = req.params;
    let booking;
    if(id){
        booking = await Booking.findById(id)
            .populate("userID", "username name")
            .populate("movie", "title")
            .populate("cinema", "name location")
            .populate("hall", "name")
            .populate("showtime", "time date price");

        if (!booking) {
            throw new ApiError(404, "Booking not found");
        }
    }
    else{
        booking = await Booking.find()
        .populate("userID", "username name")
        .populate("movie", "title")
        .populate("cinema", "name location")
        .populate("hall", "name")
        .populate("showtime", "time date price");

        if (booking.length === 0) {
            throw new ApiError(404, "No bookings found");
        }
    }
    return res.status(200).json(
        new ApiResponse(200, booking, "Bookings fetched successfully")
    );
})

const createBooking = asyncHandler(async (req, res) => {
    const {userID, movie, cinema, hall, showtime, seats} = req.body;
    if(!userID || !movie || !cinema || !hall || !showtime || !seats){
        throw new ApiError(400, "All fields are required");
    }
    const userExists = await User.findById(userID);
    if(!userExists){
        throw new ApiError(404, "User not found");
    }
    const movieExists = await Movie.findById(movie);
    if (!movieExists) {
        throw new ApiError(404, "Movie not found");
    }

    const cinemaExists = await Cinema.findById(cinema);
    if (!cinemaExists) {
        throw new ApiError(404, "Cinema not found");
    }

    const hallExists = await Hall.findById(hall);
    if (!hallExists) {
        throw new ApiError(404, "Hall not found");
    }

    const showtimeExists = await Showtime.findById(showtime);
    if (!showtimeExists) {
        throw new ApiError(404, "Showtime not found");
    }

    const booking = new Booking({
        userID,
        movie,
        cinema,
        hall,
        showtime,
        seats
    });

    await booking.save();

    await User.findByIdAndUpdate(
        userID,
        { $push: {bookings: booking._id}},
        {new: true}
    );



    return res.status(201).json(
        new ApiResponse(201, booking, "Booking created successfully")
    );
})

const deleteBooking = asyncHandler(async (req, res) => {  
    const {id} = req.params;
    const booking = await Booking.findById(id);
    if(!booking){
        throw new ApiError(404, "Booking not found");
    }

    await Booking.findByIdAndDelete(id);

    const user = await User.findById(booking.userID);
    if (user) {
        await User.findByIdAndUpdate(
            booking.userID,
            { $pull: { bookings: id } }
        );
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Booking deleted successfully")
    );
    
})

export { 
    getBooking,
    createBooking,
    deleteBooking
};