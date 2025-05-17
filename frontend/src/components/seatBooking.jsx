import React from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Glow from "./glow"
import Header from "./Header"
import { ChevronRight } from "lucide-react"

const SeatLayout = () => {
  const { id } = useParams()
  const [movieData, setMovieData] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation()
  const { selectedDate, selectedShowtime, selectedhall } = location.state || {}

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/movies/${id}`)
        setMovieData(response.data.data)
      } catch (err) {
        console.error("Error fetching movie:", err)
        setError("Failed to fetch movie data.")
      } finally {
        setLoading(false)
      }
    };
    fetchMovie()
  }, [id]);
  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!movieData) return <div className="text-white text-center mt-10">No movie found</div>;

  // Seat status: 0 = available, 1 = booked
  const seatLayout = {
    left: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    center: [
      [0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0],
    ],
    right: [
      [1, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 0, 0, 1],
    ],
  }

  const toggleSeatSelection = (seatId, seatStatus) => {
    if (seatStatus === 1) return
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId) ? prevSelected.filter((id) => id !== seatId) : [...prevSelected, seatId],
    )
  }

  const getTotalPrice = () => {
    return selectedSeats.length * 12.99
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-gray-100 overflow-hidden">
      <Header />
      <Glow />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center justify-center h-full w-full max-w-5xl px-4 -mt-10"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-200 mt-10">{movieData?.name}</h2>
          <p className="text-lg text-gray-400">{selectedhall} | {selectedDate} | {selectedShowtime}</p>
        </div>

        <div className="w-full flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-200 tracking-wide drop-shadow-lg">Select Your Seats</h2>
            <p className="text-gray-400">
              {selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"} selected
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-sm bg-blue-500/30 border-2 border-blue-500/50"></div>
              <span className="text-sm text-gray-400">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-sm bg-green-700/70 border-2 border-green-500/50"></div>
              <span className="text-sm text-gray-400">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-sm bg-gray-400 border-2 border-gray-500/50"></div>
              <span className="text-sm text-gray-400">Booked</span>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-auto pb-8 max-h-[400px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="flex flex-col items-center">
            {/* Screen */}
            <div className="w-full mb-10 flex flex-col items-center" >
              <div className="w-1/3 h-1.5 bg-gray-500/50 rounded-lg mb-1" />
              <div className="w-1/3 h-0.5 bg-gray-500/30 rounded-lg mb-6" />
              <span className="text-gray-400 text-sm uppercase tracking-widest">Screen</span>
            </div>

            {/* Seat Layout */}
            <div className="flex flex-col space-y-1.5">
              {seatLayout.left.map((_, rowIndex) => {
                // Calculate transform for curved theater effect
                const rowWidth =
                  seatLayout.left[rowIndex].length +
                  seatLayout.center[rowIndex].length +
                  seatLayout.right[rowIndex].length
                const curveAmount = Math.min(rowIndex * 0.5, 4) // Increase curve for back rows

                return (
                  <motion.div
                    key={rowIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rowIndex * 0.03, duration: 0.3 }}
                    className="flex items-center justify-center"
                    style={{
                      transform: `perspective(800px) rotateX(${curveAmount}deg)`,
                      transformOrigin: "center bottom",
                    }}
                  >
                    <span className="text-xs font-medium w-5 text-right mr-2 text-gray-400">
                      {String.fromCharCode(65 + rowIndex)}
                    </span>

                    {/* Left Block */}
                    <div className="flex space-x-1">
                      {seatLayout.left[rowIndex].map((seat, colIndex) => {
                        const seatId = `L-${rowIndex}-${colIndex}`
                        const isSelected = selectedSeats.includes(seatId)
                        const isBooked = seat === 1
                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeatSelection(seatId, seat)}
                            disabled={isBooked}
                            className={`w-7 h-7 rounded-sm text-[10px] flex items-center justify-center transition-all duration-200
                              ${
                                isBooked
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : isSelected
                                    ? "bg-green-700/70 hover:bg-green-600/80"
                                    : "bg-blue-500/30 hover:bg-blue-600/50"
                              }`}
                            title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${colIndex + 1}`}
                          >
                            {colIndex + 1}
                          </button>
                        )
                      })}
                    </div>

                    <div className="mx-2"></div>

                    {/* Center Block */}
                    <div className="flex space-x-1">
                      {seatLayout.center[rowIndex].map((seat, colIndex) => {
                        const seatId = `C-${rowIndex}-${colIndex}`
                        const isSelected = selectedSeats.includes(seatId)
                        const isBooked = seat === 1
                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeatSelection(seatId, seat)}
                            disabled={isBooked}
                            className={`w-7 h-7 rounded-sm text-[10px] flex items-center justify-center transition-all duration-200
                              ${
                                isBooked
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : isSelected
                                    ? "bg-green-700/70 hover:bg-green-600/80"
                                    : "bg-blue-500/30 hover:bg-blue-600/50"
                              }`}
                            title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${colIndex + seatLayout.left[rowIndex].length + 1}`}
                          >
                            {colIndex + seatLayout.left[rowIndex].length + 1}
                          </button>
                        )
                      })}
                    </div>

                    <div className="mx-2"></div>

                    {/* Right Block */}
                    <div className="flex space-x-1">
                      {seatLayout.right[rowIndex].map((seat, colIndex) => {
                        const seatId = `R-${rowIndex}-${colIndex}`
                        const isSelected = selectedSeats.includes(seatId)
                        const isBooked = seat === 1
                        const seatNumber =
                          colIndex + seatLayout.left[rowIndex].length + seatLayout.center[rowIndex].length + 1
                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeatSelection(seatId, seat)}
                            disabled={isBooked}
                            className={`w-7 h-7 rounded-sm text-[10px] flex items-center justify-center transition-all duration-200
                              ${
                                isBooked
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : isSelected
                                    ? "bg-green-700/70 hover:bg-green-600/80"
                                    : "bg-blue-500/30 hover:bg-blue-600/50"
                              }`}
                            title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${seatNumber}`}
                          >
                            {seatNumber}
                          </button>
                        )
                      })}
                    </div>

                    <span className="text-xs font-medium w-5 text-left ml-2 text-gray-400">
                      {String.fromCharCode(65 + rowIndex)}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full mt-6 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Booking Summary</h3>
              <div className="text-sm text-gray-400 mt-1">
                {selectedSeats.length > 0 ? (
                  <>
                    <p>
                      {selectedSeats.length} {selectedSeats.length === 1 ? "Ticket" : "Tickets"} × $12.99
                    </p>
                    <p className="mt-1">
                      Seats:{" "}
                      {selectedSeats
                        .map((seat) => {
                          const [section, row, col] = seat.split("-")
                          const rowLetter = String.fromCharCode(65 + Number.parseInt(row))
                          let seatNumber = Number.parseInt(col) + 1

                          if (section === "C") {
                            seatNumber += seatLayout.left[Number.parseInt(row)].length
                          } else if (section === "R") {
                            seatNumber +=
                              seatLayout.left[Number.parseInt(row)].length +
                              seatLayout.center[Number.parseInt(row)].length
                          }

                          return `${rowLetter}${seatNumber}`
                        })
                        .join(", ")}
                    </p>
                  </>
                ) : (
                  <p>No seats selected</p>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-200">${getTotalPrice().toFixed(2)}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={selectedSeats.length === 0}
                className={`px-4 py-2 mt-2 text-sm font-medium text-gray-200 bg-[#870000] rounded-md hover:bg-[#610000] transition-all duration-300 shadow-md flex items-center ${
                  selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Proceed to Checkout
                <ChevronRight className="ml-1 h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SeatLayout
