import React, { useState } from 'react';


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
      <div className="flex flex-col h-screen bg-indigo-900 p-4">
        <h2 className="text-2xl text-white mb-4">Music</h2>
        {tracks.map((track, index) => (
          <button
            key={index}
            className="mb-2 p-2 bg-blue-500 text-white rounded"
            onClick={() => setCurrentTrack(track)}
          >
            {track}
          </button>
        ))}
        {currentTrack && (
          <div className="mt-auto p-4 bg-blue-700 rounded">
            <p className="text-white mb-2">Now playing: {currentTrack}</p>
            <div className="flex justify-between text-white">
              <button>Previous</button>
              <button>Play/Pause</button>
              <button>Next</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Music;