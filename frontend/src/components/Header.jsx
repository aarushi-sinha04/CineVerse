import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="w-full sticky top-0 z-50 bg-black/30 shadow-md hover:bg-black/80 transition duration-300">
            <div className="p-4 flex items-center justify-between max-w-6xl mx-auto">
                
                {/* Logo */}
                <NavLink to= '/'>
                <div className="text-gray-100 font-bold text-3xl tracking-wide">
                    Cine<span className="text-[#d90101]">Verse</span>
                </div>
                </NavLink>

                {/* Search Bar */}
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search movies..." 
                        className="w-100 h-10 bg-gray-800/40 text-gray-100 border border-gray-600/50 rounded-full pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500/70 transition duration-200"
                    />
                    <button className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-200 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" 
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </div>

                
                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8 text-lg text-gray-100">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `hover:text-gray-400 transition ${isActive ? "text-gray-400 font-semibold" : ""}`
                        }>
                        Home
                    </NavLink>
                    
                    <NavLink 
                        to="/all-movies" 
                        className={({ isActive }) => 
                            `hover:text-gray-400 transition ${isActive ? "text-gray-400 font-semibold" : ""}`
                        }>
                        Movies
                    </NavLink>

                    <NavLink 
                        to="/cinema" 
                        className={({ isActive }) => 
                            `hover:text-gray-400 transition ${isActive ? "text-gray-400 font-semibold" : ""}`
                        }>
                        Cinema
                    </NavLink>

                    <NavLink 
                        to="/my-bookings" 
                        className={({ isActive }) => 
                            `hover:text-gray-400 transition ${isActive ? "text-gray-400 font-semibold" : ""}`
                        }>
                        My Bookings
                    </NavLink>
                </nav>

                {/* Mobile Menu Button (Optional) */}
                <button className="md:hidden text-gray-100 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" 
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </header>
    );
}

export default Header;
