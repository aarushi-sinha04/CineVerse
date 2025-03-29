import {ApiError }from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Movie } from "../models/movie.model.js";
import { Showtime } from "../models/showtime.model.js";

import { Hall } from "../models/hall.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const getMovies = asyncHandler(async (req, res) => {
    const {id} = req.params;
    let movies;
    if(id){
        movies = await Movie.findById(id);
        if (!movies) {
            throw new ApiError(404, "Movie not found");
        }
    }
    else{
        movies = await Movie.find();
        if (movies.length === 0) {
            throw new ApiError(404, "No Movies found");
        }

    }
    
    
    return res.status(200).json(
        new ApiResponse(200, movies, "Movies fetched successfully")
    );
})
const createMovie = asyncHandler(async (req, res) => {
    const {name, duration, genre, description, hall,showtime = [], poster} = req.body;
    if(!name || !duration || !genre || !description || !hall  || !poster){
        throw new ApiError(400, "all information is required");
    }
    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
        throw new ApiError(400, "Movie already exists with this name");
    }
    const hallExists = await Hall.findById(hall);
    if(!hallExists){
        throw new ApiError(404, "hall not found");
    }
    const movie = new Movie({
        name,
        duration,
        genre,
        description,
        hall,
        showtime,
        poster
        
        
        
    });
    await movie.save();
  
    
    await Hall.findByIdAndUpdate(
        hall,
        { $push: {movies: movie._id}},
        {new: true}
    
    )
    await Showtime.findByIdAndUpdate(
        showtime,
        { $push: {movies: movie._id}},
        {new: true}
    )
    return res.status(201).json(
        new ApiResponse(201,movie, "Movie created successfully")
    );
})

const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    await movie.deleteOne();

   
    
    await Hall.updateMany(  
        { Movies: id },
        { $pull: {movies: id}}
    );
    await Showtime.updateMany(
        { Movies: id },
        { $pull: {movies: id}}
    );
    return res.status(200).json(
        new ApiResponse(200, {}, "Movie deleted successfully")
    );
})

const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedMovie) {
        throw new ApiError(404, "Movie not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, updatedMovie, "Movie updated successfully")
    );

})

export{
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie
}