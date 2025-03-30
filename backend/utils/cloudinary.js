import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
// import streamifier from "streamifier";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder: "CineVerse/movies" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};


export { cloudinary, uploadOnCloudinary };
