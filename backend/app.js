import express from "express";
import cors from "cors";
import locationRoutes from "./routes/location.route.js";
import cinemaRoutes from "./routes/cinema.route.js";
import hallRoutes from "./routes/hall.route.js";
import bookingRoutes from "./routes/booking.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to CineVerse Backend!");
});

// Register API routes
app.use("/api/locations", locationRoutes);
app.use("/api/cinemas", cinemaRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
