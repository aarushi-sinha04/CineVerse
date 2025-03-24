import ApiError from "../models/ApiError.js";
import ApiResponse from "../models/ApiResponse.js";
import Cinema from "../models/cinema.model.js";
import { Location } from "../models/location.model.js";
const getCinemas = async (req, res) => {
    const cinemas = await Cinema.find();
    if (cinemas.length === 0) {
        throw new ApiError(404, "No cinemas found");
    }
    return res.status(200).json(
        new ApiResponse(200, cinemas, "Cinemas fetched successfully")
    );
}
const createCinema = async (req, res) => {
    const {name, location, movies = [], hall = []} = req.body;
    if(!name || !location){
        throw new ApiError(400, "Name and location are required");
    }
    const cinema = new Cinema({
        name,
        location,
        movies,
        hall
    });
    await cinema.save();
    await Location.findByIdAndUpdate(
        location,
        { $push: {cinemas: cinema._id}},
        {new: true}
    
    )
    return res.status(201).json(
        new ApiResponse(201,cinema, "Cinema created successfully")
    );
}

const deleteCinema = async (req, res) => {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);
    if (!cinema) {
        throw new ApiError(404, "Cinema not found");
    }
    await cinema.deleteOne();

    await Location.updateMany(
        { cinemas: id },
        { $pull: {cinemas: id}
    }
    )
    return res.status(200).json(
        new ApiResponse(200, {}, "Cinema deleted successfully")
    );
}

const updateCinema = async (req, res) => {
    const { id } = req.params;
    const updatedCinema = await Cinema.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedCinema) {
        throw new ApiError(404, "Cinema not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, updatedCinema, "Cinema updated successfully")
    );

}

export{
    getCinemas,
    createCinema,
    deleteCinema,
    updateCinema
}