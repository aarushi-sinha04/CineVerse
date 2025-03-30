import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory instead of disk

export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
    { name: "verticalPoster", maxCount: 1 },
    { name: "horizontalPoster", maxCount: 1 }
]);
