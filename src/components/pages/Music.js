import React, { useState, useEffect } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { verifyToken } from '../../utils';  // Assuming you have a verifyToken function

export  function loader() {
  console.log('hello');
 //  return null;
 try {
   const user = verifyToken(); // Check if the token is valid and return the user information
   return { user }; // Return the user data to the component
 } catch (err) {
   console.error('Authentication error:', err.message);
   return redirect('/login'); // Redirect to the login page if no valid token is found
 }
}

const Music = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  const tracks = [
    "Relaxing Music 1",
    "Relaxing Music 2",
    "Relaxing Music 3",
    "Relaxing Music 4",
    "Relaxing Music 5"
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 p-6">
      <h2 className="text-3xl text-white font-semibold text-center mb-6">Music</h2>
      
      {/* Track List */}
      <div className="flex flex-col space-y-4 items-center">
        {tracks.map((track, index) => (
          <button
            key={index}
            className="w-3/4 p-3 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ease-in-out"
            onClick={() => setCurrentTrack(track)}
          >
            {track}
          </button>
        ))}
      </div>

      {/* Now Playing Section */}
      {currentTrack && (
        <div className="mt-12 p-6 bg-blue-800 rounded-xl shadow-2xl w-full max-w-lg mx-auto">
          <p className="text-xl text-white text-center mb-4">Now Playing: {currentTrack}</p>
          
          {/* Play Control Buttons */}
          <div className="flex justify-around text-white">
            <button className="bg-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200">Previous</button>
            <button className="bg-green-500 px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all duration-200">Play/Pause</button>
            <button className="bg-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
