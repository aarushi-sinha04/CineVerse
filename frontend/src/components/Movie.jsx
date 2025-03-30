import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import axios from "axios";



function MoviePage() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/movies/${id}`);
                setMovieData(response.data.data);
                
            } catch (err) {
                console.error("Error fetching movie:", err);
                setError("Failed to fetch movie data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);
    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
    if (!movieData) return <div className="text-white text-center mt-10">No movie found</div>;

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
            <Header />

            {/* Background Poster */}
            <div className="absolute inset-0 w-full h-full">
                <img src={movieData.horizontalPoster} alt={movieData.name} className="w-full h-full object-cover opacity-30" />
            </div>


      
            
            {/* Movie Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24">
                {/* Movie Details */}
                <motion.div className="bg-black/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                    <h1 className="text-5xl font-bold text-gray-200">{movieData.name}</h1>
                    <p className="text-lg text-gray-400 mt-2">{movieData.genre} | {movieData.duration} min</p>
                    <p className="mt-4 text-gray-300 text-lg">{movieData.description}</p>
                    {/* Extra Buttons */}
                <div className="mt-6 flex space-x-4 items-center">
                    <a href={movieData.trailer} target="_blank" rel="noopener noreferrer" className="bg-[#ba1745]/90 py-3 px-6 rounded-md text-white/80 font-bold hover:bg-[#ba1745]/70">Watch Trailer</a>
                    
                    <button  className="w-40 bg-red-700/70 py-3 rounded-md text-white font-bold hover:bg-red-800/70 transition">Book Now</button>
                    
                </div>
                
                </motion.div>

                {/* Booking Section */}
                
                
                
                
            </div>
        </div>
    );
}

export default MoviePage;
