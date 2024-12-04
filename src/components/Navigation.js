import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MusicNoteIcon, VideoCameraIcon, ClipboardIcon, SupportIcon } from '@heroicons/react/outline';  // Add SupportIcon for Techniques

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: <HomeIcon className="h-6 w-6" /> },
    { path: "/quiz", label: "Quiz", icon: <ClipboardIcon className="h-6 w-6" /> },
    { path: "/music", label: "Music", icon: <MusicNoteIcon className="h-6 w-6" /> },
    { path: "/video", label: "Video", icon: <VideoCameraIcon className="h-6 w-6" /> },
    { path: "/techniques", label: "Techniques", icon: <SupportIcon className="h-6 w-6" /> }, // Added Techniques link
  ];

  return (
    <>
      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-blue-800 shadow-lg z-50">
        <div className="flex justify-around items-center p-2">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center text-white font-medium transition-all duration-300 ease-in-out 
              ${location.pathname === path ? 'text-yellow-300 scale-110' : 'text-base'} 
              hover:text-yellow-300 hover:scale-110`}
            >
              {icon}
              <span className="text-sm mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
