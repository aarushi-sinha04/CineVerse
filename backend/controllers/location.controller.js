import ApiError from "../models/ApiError.js";
import ApiResponse from "../models/ApiResponse.js";
import { Cinema, Hall } from "../models/cinema.model.js";
import Location from "../models/location.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const getLocations = asyncHandler(async (req, res) => {
    const id = req.params.id;
    let locations;
    if(id){
        locations = await Location.findById(id);
        if (!locations) {
            throw new ApiError(404, "location not found");
        }

    }
    else{
        locations = await Location.find();
        if (locations.length === 0) {
            throw new ApiError(404, "No locations found");
        }
    }
    return res.status(200).json(
        new ApiResponse(200, locations, "Locations fetched successfully")
    );
})

const createLocation = asyncHandler(async(req, res) => {
    const {location, cinemas = []} = req.body;
    if(!location){
        throw new ApiError(400, "Location is required");
    }
    if(cinemas.length>0){
        const cinemaExists = await Cinema.find({_id: { $in: cinemas}});
        if(cinemaExists.length !== cinemas.length){
            throw new ApiError(404, "One or more cinemas not found");
        }
    }

    const locationnew = new Location({
        location,
        cinemas
    });
    await locationnew.save();
    await Cinema.updateMany(
        { _id: { $in: cinemas}},
        { $set: { location:
        locationnew._id}}
    )
    
    return res.status(201).json(
        new ApiResponse(201, locationnew, "Location created successfully")
    );
})

const updateLocation = asyncHandler(async(req, res) => {
    const {id} = req.params;

    if (Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Request body cannot be empty");
    }
    

    const updatedLocation = await Location.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedLocation){
        throw new ApiError(404, "Location not found");
    }

    
    return res.status(200).json(
        new ApiResponse(200, updatedLocation, "Location updated successfully")
    );

})

const deleteLocation = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const location = await Location.findByIdAndDelete(id);
    if(!location){
        throw new ApiError(404, "Location not found");
    }

    const cinemas = await Cinema.find({location: id});
    if(cinemas.length>0){
        const cinemaIds = cinemas.map(cinema => cinema._id);
        await Hall.deleteMany({ cinema: { $in: cinemaIds } });
        await Cinema.deleteMany({ location: id });
        
    }
    


    return res.status(200).json(
        new ApiResponse(200, {}, "Location deleted successfully")
    );
    

})

export{
    getLocations,
    updateLocation,
    deleteLocation,
    createLocation

}