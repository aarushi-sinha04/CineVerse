import {ApiError }from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Cinema } from "../models/cinema.model.js";
import { Hall } from "../models/hall.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const getHalls = asyncHandler(async (req, res) => {
    const id = req.params.id;
    let halls;
    if(id){
        halls = await Hall.findById(id);
        if (!halls) {
            throw new ApiError(404, "Hall not found");
        }
    }
    else{
        halls = await Hall.find();
        if (halls.length === 0) {
            throw new ApiError(404, "No halls found");
        }

    }
    
    
    return res.status(200).json(
        new ApiResponse(200, halls, "halls fetched successfully")
    );
})
const createHall = asyncHandler(async (req, res) => {
    const {screenNumber, cinema, showtime = [], totalSeats} = req.body;
    if(!screenNumber || !cinema || !totalSeats){
        throw new ApiError(400, "screenNumber and cinema are required");
    }
    const cinemaExists = await Cinema.findById(cinema);
    if(!cinemaExists){
        throw new ApiError(404, "cinema not found");
    }
    const hall = new Hall({
        screenNumber,
        cinema,
        showtime,
        totalSeats
    });
    await hall.save();
    await Cinema.findByIdAndUpdate(
        cinema,
        { $push: {halls: hall._id}},
        {new: true}
    
    )
    return res.status(201).json(
        new ApiResponse(201,hall, "Hall created successfully")
    );
})

const deleteHall = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hall = await Hall.findById(id);
    if (!hall) {
        throw new ApiError(404, "Hall not found");
    }
    await hall.deleteOne();

    await Cinema.updateMany(
        { halls: id },
        { $pull: {halls: id}}
    );
    return res.status(200).json(
        new ApiResponse(200, {}, "Hall deleted successfully")
    );
})

const updateHall = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedHall = await Hall.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedHall) {
        throw new ApiError(404, "Hall not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, updatedHall, "Hall updated successfully")
    );

})

export{
    getHalls,
    createHall,
    deleteHall,
    updateHall
}