import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-around items-center bg-blue-800 p-4">
      <Link to="/" className={`text-white ${location.pathname === '/' ? 'text-xl' : 'text-base'}`}>
        Home
      </Link>
      <Link to="/quiz" className={`text-white ${location.pathname === '/quiz' ? 'text-xl' : 'text-base'}`}>
        Quiz
      </Link>
      <Link to="/music" className={`text-white ${location.pathname === '/music' ? 'text-xl' : 'text-base'}`}>
        Music
      </Link>
      <Link to="/video" className={`text-white ${location.pathname === '/video' ? 'text-xl' : 'text-base'}`}>
        Video
      </Link>
      <Link to="/profile" className={`text-white ${location.pathname === '/profile' ? 'text-xl' : 'text-base'}`}>
        Profile
      </Link>
    </nav>
  );
};

export default Navigation;
