import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="w-full sticky top-0 z-50 bg-black/30 shadow-md">
            <div className="p-4 flex items-center justify-between max-w-6xl mx-auto">
                
                {/* Logo */}
                <div className="text-gray-100 font-bold text-3xl tracking-wide">
                    Cine<span className="text-[#d90101]">Verse</span>
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
                        to="/movie" 
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
