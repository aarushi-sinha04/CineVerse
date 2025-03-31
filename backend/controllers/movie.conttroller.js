import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Movie } from "../models/movie.model.js";
import { Showtime } from "../models/showtime.model.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

// Get Movies (All or Single)
const getMovies = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let movies;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
        movies = await Movie.findById(id)
            .populate({
                path: "showtimes",
                populate: {
                    path: "hall",
                    populate: {
                        path: "cinema" // Get cinema details inside hall
                    }
                }
            });

        if (!movies) {
            throw new ApiError(404, "Movie not found");
        }
    } else {
        movies = await Movie.find()
            .populate({
                path: "showtimes",
                populate: {
                    path: "hall",
                    populate: {
                        path: "cinema" // Get cinema details inside hall
                    }
                }
            });

        if (!movies.length) {
            throw new ApiError(404, "No Movies found");
        }
    }

    return res.status(200).json(
        new ApiResponse(200, movies, "Movies fetched successfully")
    );
});


// Create a Movie
const createMovie = asyncHandler(async (req, res) => {
    const { name, duration, genre, description, showtime = [], verticalPoster, horizontalPoster, trailer } = req.body;

    if (!name || !duration || !genre || !description || !verticalPoster || !horizontalPoster || !trailer) {
        throw new ApiError(400, "All information is required");
    }

    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
        throw new ApiError(400, "Movie already exists with this name");
    }

    const movie = new Movie({
        name,
        duration,
        genre,
        description,
        showtime,
        verticalPoster,
        horizontalPoster,
        trailer
    });

    await movie.save();

    // Update multiple showtimes with the new movie ID
    if (showtime.length) {
        await Showtime.updateMany(
            { _id: { $in: showtime } },
            { $push: { movies: movie._id } }
        );
    }

    return res.status(201).json(
        new ApiResponse(201, movie, "Movie created successfully")
    );
});

// Delete a Movie
const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Movie ID");
    }

    const movie = await Movie.findById(id);
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }

    await movie.deleteOne();

    // Remove movie reference from showtimes
    await Showtime.updateMany(
        { movies: id },
        { $pull: { movies: id } }
    );

    return res.status(200).json(
        new ApiResponse(200, {}, "Movie deleted successfully")
    );
});

// Update a Movie
const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Movie ID");
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMovie) {
        throw new ApiError(404, "Movie not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedMovie, "Movie updated successfully")
    );
});

export {
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie
};
