import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to CineVerse Backend!");
});

export default app;
