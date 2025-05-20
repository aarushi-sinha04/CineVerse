import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let user;

    if (id) {
        user = await User.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    } else {
        user = await User.find();
        if (user.length === 0) {
            throw new ApiError(404, "No users found");
        }
    }

    return res.status(200).json(new ApiResponse(200, user, "User(s) fetched successfully"));
});

const createUser = asyncHandler(async (req, res) => {
    const { username, name, role} = req.body;

    if (!username || !name || !role) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Create user
    const newUser = new User({
        username,
        name,
        role,
        bookings: []
    });

    await newUser.save();

    return res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "User ID is required");
    }

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    // Delete user
    await User.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
}
);

export { 
    getUser, 
    createUser ,
    deleteUser
};