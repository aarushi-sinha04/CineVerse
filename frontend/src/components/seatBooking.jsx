import React, { useState } from "react";
import { motion } from "framer-motion";
import Glow from "./glow";
import Header from "./Header";

const SeatLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatLayout = [
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
  ];

  const toggleSeatSelection = (row, col) => {
    if (seatLayout[row][col] === 1) return;
    const seatId = `${row}-${col}`;
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-gray-100 overflow-hidden">
        <Header />

      <Glow />

      
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 flex flex-col items-center justify-center h-full -mt-16"
      >
        <div className="mb-6 align-left">
          <h2 className="text-3xl font-bold text-gray-200">Avengers: Endgame</h2>
          <p className="text-lg text-gray-400">PVR Cinemas | March 30, 2025 | 7:30 PM</p>
        </div>
        <div></div>


        <h2 className="text-4xl font-bold mb-6 text-gray-200 tracking-wide drop-shadow-lg">
          Select Your Seats
        </h2>
        <div className="flex flex-col space-y-2 mb-4">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-2">
              <span className="text-lg font-semibold mr-2">{String.fromCharCode(65 + rowIndex)}</span>
              {row.map((seat, colIndex) => {
                const seatId = `${rowIndex}-${colIndex}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = seat === 1;
                return (
                  <button
                    key={seatId}
                    onClick={() => toggleSeatSelection(rowIndex, colIndex)}
                    disabled={isBooked}
                    className={`w-12 h-12 border-2 rounded-md flex items-center justify-center text-lg font-semibold shadow-md transition-all duration-300
                      ${isBooked ? "bg-gray-400 cursor-not-allowed" : isSelected ? "bg-green-700/70" : "bg-blue-500/30 hover:bg-blue-800/80"}`}
                  >
                    {seat === 1 ? "X" : isSelected ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="w-full mt-6 flex flex-col items-center">
          <div className="w-3/4 h-2 bg-gray-500 rounded-lg" />
          <span className="mt-2 text-gray-400 text-lg">CINEMA SCREEN</span>
        </div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        >
          <button
            disabled={selectedSeats.length === 0}
            className={`px-6 py-3 mt-6 text-lg font-medium text-gray-200 bg-[#870000] rounded-lg hover:bg-[#610000] hover:text-gray-300 transition-all duration-300 shadow-md ${
              selectedSeats.length === 0 ? "cursor-not-allowed" : ""
            }`}
          >
            Book Selected Seats
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SeatLayout;
