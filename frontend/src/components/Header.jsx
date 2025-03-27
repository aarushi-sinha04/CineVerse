import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="w-full sticky top-0 z-50 ">
            <div className=' bg-red-950 p-4  flex items-center justify-between '>
            <div className='text-gray-100 font-bold text-2xl  '>
                CineVerse
            </div>
            <div className='absolute left-1/2 transform -translate-x-1/2 flex space-x-10 text-xl text-gray-100'>
                <NavLink to="/" 
                className={({isActive}) => `'hover:text-gray-400' ${isActive? "text-gray-400 font-bold": ''}` }
                >Home</NavLink>
                
                 <NavLink 
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Please enter city below')}} 
                  to="/weather"
                  className={({ isActive }) => `hover:text-gray-400 ${isActive ? "text-gray-400 font-bold" : ""}`}>
                  Weather
              </NavLink>

                </div>
            
            </div>


        </header>
    )
}

export default Header;