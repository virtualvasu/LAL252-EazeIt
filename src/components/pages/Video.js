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

const Video = () => {
    const videos = [
      { title: "TED: This could be why you're depressed or anxious", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "TED: How to live a stress free life?", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Motivation", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ];
  
    return (
      <div className="flex flex-col h-screen bg-indigo-900 p-4">
        <h2 className="text-2xl text-white mb-4">Videos</h2>
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 p-2 bg-blue-500 text-white rounded block"
          >
            {video.title}
          </a>
        ))}
      </div>
    );
  };

  export default Video;