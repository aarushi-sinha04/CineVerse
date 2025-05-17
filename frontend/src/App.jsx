import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import MoviePage from './components/Movie.jsx';
import Landing from './components/Landing.jsx';
import AllmoviesPage from './components/Allmovies.jsx';
import BookingPage from './components/movieBooking.jsx';
import SeatLayout from './components/seatBooking.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="/all-movies" element={<AllmoviesPage />} />
      <Route path="/movie/:id" element={<MoviePage />} /> {/* Dynamic Movie Route */}
      <Route path="/booking-movie/:id" element={<BookingPage />} /> 
      <Route path="/seat-booking/:id" element={<SeatLayout />} /> 
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
