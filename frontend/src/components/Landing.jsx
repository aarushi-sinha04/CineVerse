import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Glow from "./glow";
// Import the glow component


const Landing = () => {
    return (
        
        <div className="relative h-screen w-full flex flex-col items-center justify-center text-gray-100 overflow-hidden">
            <Header />

            <Glow/>


            {/* Content Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center z-10 flex flex-col items-center justify-center h-full -mt-16"
            >
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-6xl font-bold mb-6 text-gray-200 tracking-wide drop-shadow-lg"
                >
                    Welcome to{" "}
                    <span className="text-[#dc0000] drop-shadow-lg">
                        CineVerse
                    </span>
                </motion.h2>



                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed"
                >
                    Experience the magic of cinema. Discover, explore, and book your next movie with ease.
                </motion.p>

                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
                >
                    <NavLink 
                        to="/all-movies" 
                        className="px-6 py-3 text-lg font-medium text-gray-200 bg-[#870000] rounded-lg hover:bg-[#610000] hover:text-gray-300 transition-all duration-300 shadow-md"
                    >
                        Explore Movies
                    </NavLink>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Landing;

