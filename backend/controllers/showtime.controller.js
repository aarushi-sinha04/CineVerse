import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Showtime } from "../models/showtime.model.js";
import { Movie } from "../models/movie.model.js";
import { Hall } from "../models/hall.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const getShowtime = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let showtime;

    if (id) {
        showtime = await Showtime.findById(id).populate("movie hall");
        if (!showtime) {
            throw new ApiError(404, "Showtime not found");
        }
    } else {
        showtime = await Showtime.find().populate("movie hall");
        if (showtime.length === 0) {
            throw new ApiError(404, "No showtimes found");
        }
    }

    return res.status(200).json(new ApiResponse(200, showtime, "Showtime(s) fetched successfully"));
});

const createShowtime = asyncHandler(async (req, res) => {
    const { movie, hall, startTime, endTime, date, price, availableSeats, bookedSeats = [] } = req.body;

    if (!movie || !hall || !startTime || !date || !price || !availableSeats || !Array.isArray(availableSeats)) {
        throw new ApiError(400, "All fields are required, and availableSeats must be an array.");
    }

    // Validate if the movie and hall exist
    const movieExists = await Movie.findById(movie);
    if (!movieExists) {
        throw new ApiError(404, "Movie not found");
    }

    const hallExists = await Hall.findById(hall);
    if (!hallExists) {
        throw new ApiError(404, "Hall not found");
    }

    // Create showtime
    const newShowtime = new Showtime({
        movie,
        hall,
        startTime,
        endTime,
        date,
        price,
        availableSeats,
        bookedSeats
    });

    await newShowtime.save();
    await Movie.findByIdAndUpdate(
        movie,
        { $push: { showtimes: newShowtime._id } },
        { new: true }
    );
    
    await Hall.findByIdAndUpdate(
        hall,
        { $push: { showtimes: newShowtime._id } },
        { new: true }
    );
    

    return res.status(201).json(new ApiResponse(201, newShowtime, "Showtime created successfully"));
});

const deleteShowtime = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const showtime = await Showtime.findById(id);
    if (!showtime) {
        throw new ApiError(404, "Showtime not found");
    }

    // Remove showtime reference from Hall and Movie
    await Hall.findByIdAndUpdate(
        showtime.hall,  // Correctly reference the hall ID
        { $pull: { showtimes: id } },
        { new: true }
    );

    await Movie.findByIdAndUpdate(
        showtime.movie,  // Correctly reference the movie ID
        { $pull: { showtimes: id } },
        { new: true }
    );

    // Delete the showtime
    await showtime.deleteOne();

    return res.status(200).json(new ApiResponse(200, {}, "Showtime deleted successfully"));
});

const updateShowtime = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { availableSeats, bookedSeats } = req.body;

    // Ensure bookedSeats doesn't exceed availableSeats
    if (bookedSeats && availableSeats && bookedSeats.length > availableSeats.length) {
        throw new ApiError(400, "Booked seats cannot exceed available seats.");
    }

    const updatedShowtime = await Showtime.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedShowtime) {
        throw new ApiError(404, "Showtime not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedShowtime, "Showtime updated successfully"));
});

export {
    getShowtime,
    createShowtime,
    deleteShowtime,
    updateShowtime
};
