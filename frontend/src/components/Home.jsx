import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";

function Home() {
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center text-gray-100 overflow-hidden">
            <Header />

            {/* Background Animation Layer */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-950"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
            ></motion.div>

            {/* Enhanced Red Glow - Moderately Bright */}
            <motion.div 
                className="absolute w-[400px] h-[400px] bg-red-600 opacity-35 rounded-full blur-[170px]"
                initial={{ x: "-50%", y: "-50%" }}
                animate={{ x: ["-30%", "25%", "-30%"], y: ["-20%", "15%", "-20%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* More Visible Navy Blue Glow - Balanced Intensity */}
            <motion.div 
                className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-700 opacity-30 rounded-full blur-[160px]"
                initial={{ x: "50%", y: "50%" }}
                animate={{ x: ["25%", "-30%", "25%"], y: ["15%", "-20%", "15%"] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* New Purple Glow for a Galactic Effect - Softer but Noticeable */}
            <motion.div 
                className="absolute top-16 left-1/2 w-[300px] h-[300px] bg-purple-600 opacity-25 rounded-full blur-[150px]"
                initial={{ x: "-40%", y: "-30%" }}
                animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "15%", "-10%"] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>


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
                        to="/movie" 
                        className="px-6 py-3 text-lg font-medium text-gray-200 bg-[#870000] rounded-lg hover:bg-[#610000] hover:text-gray-300 transition-all duration-300 shadow-md"
                    >
                        Explore Movies
                    </NavLink>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Home;
