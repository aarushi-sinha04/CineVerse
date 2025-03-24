import ApiError from "../models/ApiError.js";
import ApiResponse from "../models/ApiResponse.js";
import Location from "../models/location.model.js";

const getLocations = async (req, res) => {
    const location = await Location.find();
    if (location.length === 0) {
        throw new ApiError(404, "No locations found");
    }
    return res.status(200).json(
        new ApiResponse(200, location, "Locations fetched successfully")
    );
}
const updateLocation = async(req, res) => {
    const {id} = req.params;
    const updatedLocation = await Location.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedLocation){
        throw new ApiError(404, "Location not found");
    }
    return res.status(200).json(
        new ApiResponse(200, updatedLocation, "Location updated successfully")
    );

}
const deleteLocation = async(req, res) => {
    const {id} = req.params;
    const location = await Location.findByIdAndDelete(id);
    if(!location){
        throw new ApiError(404, "Location not found");
    }
    return res.status(200).json(
        new ApiResponse(200, {}, "Location deleted successfully")
    );
}

export{
    getLocations,
    updateLocation,
    deleteLocation

}