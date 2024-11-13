import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-center items-center bg-blue-800 p-4 shadow-lg">
      <div className="flex space-x-8">
        <Link 
          to="/" 
          className={`text-white font-semibold transition-all duration-300 ease-in-out ${location.pathname === '/' ? 'text-xl' : 'text-base'} hover:text-yellow-300 hover:scale-110`}
        >
          Home
        </Link>
        <Link 
          to="/quiz" 
          className={`text-white font-semibold transition-all duration-300 ease-in-out ${location.pathname === '/quiz' ? 'text-xl' : 'text-base'} hover:text-yellow-300 hover:scale-110`}
        >
          Quiz
        </Link>
        <Link 
          to="/music" 
          className={`text-white font-semibold transition-all duration-300 ease-in-out ${location.pathname === '/music' ? 'text-xl' : 'text-base'} hover:text-yellow-300 hover:scale-110`}
        >
          Music
        </Link>
        <Link 
          to="/video" 
          className={`text-white font-semibold transition-all duration-300 ease-in-out ${location.pathname === '/video' ? 'text-xl' : 'text-base'} hover:text-yellow-300 hover:scale-110`}
        >
          Video
        </Link>
        <Link 
          to="/profile" 
          className={`text-white font-semibold transition-all duration-300 ease-in-out ${location.pathname === '/profile' ? 'text-xl' : 'text-base'} hover:text-yellow-300 hover:scale-110`}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
