import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Glow from "./glow";

function BookingPage() {
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState("March 30");
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [selectedhall, setSelectedhall] = useState(null);
    const [movieData, setMovieData] = useState({});
    useEffect(() => {

        const fetchMovieData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/movies/${id}`);
                const data = await response.json();  // Extract JSON data
                setMovieData(data.data);
                const sortedDates = Object.entries(
                    data.data.showtimes.reduce((acc, showtime) => {
                        const unformatteddate = showtime.date; 
                        const date = new Date(unformatteddate).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(showtime);
                        return acc;
                    }, {})
                )
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)); // Sort dates

                // Set the first date as the default selected date
                if (sortedDates.length > 0) {
                    setSelectedDate(sortedDates[0][0]);
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchMovieData();
    }, [])

    

    const handleBooking = () => {
        if (!selectedDate || !selectedShowtime || !selectedhall) return;
        
    };

    return (
        <div className="bg-black">
        <Header />
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
            

            <Glow />

            <div className="max-w-4xl mx-auto p-6 relative z-10">
                {/* Movie Info */}
                <div className="flex gap-6">
                    <img src={movieData.verticalPoster} alt={movieData.name} className="w-48 h-72 rounded-lg" />
                    <div>
                        <h1 className="text-4xl font-bold">{movieData.name}</h1>
                        <p className="text-gray-400 mt-2">{movieData.genre} | {movieData.duration} min</p>
                        <p className="text-yellow-500 mt-2">⭐ </p>
                    </div>
                </div>

                {/* Date Selection */}
                <h2 className="mt-6 text-2xl font-bold">Select Date</h2>
                <div className="flex space-x-4 overflow-x-auto p-2">
                    {/* Check if showtimes exists and is an array */}
                    {movieData.showtimes && Array.isArray(movieData.showtimes) && Object.entries(
                        movieData.showtimes.reduce((acc, showtime) => {
                            const unformatteddate = showtime.date; 
                            const date = new Date(unformatteddate).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
                            if (!acc[date]) {
                                acc[date] = [];
                            }
                            acc[date].push(showtime);
                            return acc;
                        }, {})
                    )
                    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                    .map(([date, showtimes]) => (
                        <div key={date}>
                            {/* Display buttons for each date */}
                            <button
                                onClick={() => setSelectedDate(date)} 
                                className={`px-4 py-2 rounded-lg ${selectedDate === date ? "bg-red-600/60" : "bg-gray-800/50 hover:bg-gray-800"}`}
                            >
                                {date}
                            </button>
                        </div>
                    ))}
                </div>

                {/* hall & Showtime Selection */}
                {selectedDate && (
                    <>
                        <h2 className="mt-6 text-2xl font-bold">Select Showtime</h2>
                        <div className="space-y-6">
                            {/* Group showtimes by cinema name */}
                            {movieData.showtimes && Array.isArray(movieData.showtimes) && Object.entries(
                                movieData.showtimes.reduce((acc, showtime) => {
                                    const cinemaName = showtime.hall?.cinema?.name;
                                    const showtimeDate = new Date(showtime.date).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });

                                    // Ensure showtime matches the selected date
                                    if (showtimeDate === selectedDate) {
                                        if (!acc[cinemaName]) {
                                            acc[cinemaName] = [];
                                        }
                                        acc[cinemaName].push(showtime);
                                    }
                                    return acc;
                                }, {})
                            )
                            .sort(([cinemaA], [cinemaB]) => cinemaA.localeCompare(cinemaB))
                            .map(([cinemaName, showtimes]) => (
                                <div key={cinemaName} className="p-4 bg-gray-900/60 rounded-lg">
                                    <h3 className="text-xl font-bold text-gray-200">{cinemaName}</h3>
                                    <div className="grid grid-cols-4 gap-4 mt-2">
                                        {/* Display buttons for each showtime for this cinema */}
                                        {showtimes
                                        .sort((a, b) => new Date(`1970-01-01T${a.startTime}:00`).getTime() - new Date(`1970-01-01T${b.startTime}:00`).getTime())
                                        .map(showtime => (
                                            <button 
                                                key={showtime._id} 
                                                onClick={() => { 
                                                    setSelectedShowtime(showtime.startTime); 
                                                    setSelectedhall(showtime.hall?.cinema?.name); 
                                                }} 
                                                className={`p-2 rounded-lg ${selectedShowtime === showtime.startTime && selectedhall === showtime.hall.cinema.name ? "bg-red-600/60" : "bg-gray-800/50 hover:bg-gray-800"}`}
                                            >
                                                {showtime.startTime}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                
                


                {/* Book Now Button */}
                <NavLink to={`/seat-booking/${id}`}
                state={{ selectedDate, selectedShowtime, selectedhall }}
                className="mt-6">
                <button onClick={handleBooking}
                
                disabled={!selectedDate || !selectedShowtime}
                 className={`mt-6 w-full bg-red-600/60 py-3 rounded-lg text-white font-bold hover:bg-red-800/70 ${ selectedDate && selectedShowtime ? "" : "opacity-50 cursor-not-allowed"}`}>Book Now</button>
                </NavLink>
            </div>
        </div>
        </div>
    );
}

export default BookingPage;