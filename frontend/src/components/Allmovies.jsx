import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import axios from "axios";



function AllMoviesPage() {
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/movies");
                setMovieData(response.data.data);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("Failed to fetch movie data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }
    , []);
    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
    if (!movieData || movieData.length === 0) return <div className="text-white text-center mt-10">No movies found</div>;

    // Slider settings

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className=" bg-black">
        <Header />
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
            

            <div className="relative z-10 w-full px-6 pt-12">
                <Slider {...settings} className="w-full">
                    {movieData.map((movie) => (
                        <NavLink to={`/movie/${movie._id}`}>
                        <div key={movie._id} className="w-full">
                            <div className="relative w-full h-[500px] overflow-hidden">
                                <img src={movie.horizontalPoster} alt={movie.name} className="w-full h-full object-cover rounded-lg opacity-70" />
                                <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4">
                                    <h2 className="text-2xl font-bold text-white">{movie.name}</h2>
                                    <p className="text-gray-300">{movie.genre} | {movie.duration} min</p>
                                </div>
                            </div>
                        </div>
                        </NavLink>
                    ))}
                </Slider>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-bold text-gray-200 mb-6">Now Showing</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movieData.map((movie) => (
                        <motion.div 
                            key={movie._id} 
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                        >
                            <NavLink to={`/movie/${movie._id}`}>
                                <img src={movie.verticalPoster} alt={movie.name} className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 w-full bg-black/80 p-2 transition-opacity duration-300 group-hover:opacity-0">
                                    <h3 className="text-white text-lg font-semibold align-left">{movie.name}</h3>
                                </div>
                                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-lg font-semibold text-white text-left">{movie.name}</h3>
                                    <p className="text-gray-300">{movie.genre}</p>
                                    <p className="text-gray-400 text-sm">⭐ {movie.rating} |  {movie.duration} min</p>
                                </div>
                            </NavLink>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default AllMoviesPage;
