import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB(); // Ensure DB is connected before starting the server

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit if DB connection fails
    }
};

startServer();
