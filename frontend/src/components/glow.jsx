import React from "react";
import { motion } from "framer-motion";

const Glow = () => {
    return (
        <>
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
        </>
    );
};

export default Glow;