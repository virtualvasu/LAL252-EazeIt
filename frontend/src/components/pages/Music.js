import React, { useState, useRef } from 'react';

const Music = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Ref to control the audio player

  const tracks = [
    { name: "Relaxing Music 1", file: "/track1.mp3" },
    { name: "Relaxing Music 2", file: "/track2.mp3" },
    { name: "Relaxing Music 3", file: "/track3.mp3" },
    { name: "Relaxing Music 4", file: "/track4.mp3" },
    { name: "Relaxing Music 5", file: "/track5.mp3" },
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
    } else {
      audioRef.current.play(); // Play the audio
    }
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(track => track.name === currentTrack);
    const nextIndex = (currentIndex + 1) % tracks.length; // Loop back to the first track
    setCurrentTrack(tracks[nextIndex].name);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(track => track.name === currentTrack);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length; // Loop to the last track if at the first one
    setCurrentTrack(tracks[prevIndex].name);
  };

  const handleTrackSelection = (track) => {
    setCurrentTrack(track.name);
    setIsPlaying(true); // Automatically start playing the selected track
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 p-6">
      <h2 className="text-3xl text-white font-semibold text-center mb-6">Music</h2>
      
      {/* Track List */}
      <div className="flex flex-col space-y-4 items-center">
        {tracks.map((track, index) => (
          <button
            key={index}
            className="w-3/4 p-3 text-lg text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ease-in-out"
            onClick={() => handleTrackSelection(track)}
          >
            {track.name}
          </button>
        ))}
      </div>

      {/* Now Playing Section */}
      {currentTrack && (
        <div className="mt-12 p-6 bg-blue-800 rounded-xl shadow-2xl w-full max-w-lg mx-auto">
          <p className="text-xl text-white text-center mb-4">Now Playing: {currentTrack}</p>
          
          {/* Audio Player */}
          <audio ref={audioRef} src={tracks.find(track => track.name === currentTrack)?.file} />
          
          {/* Play Control Buttons */}
          <div className="flex justify-around text-white">
            <button
              className="bg-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="bg-green-500 px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-all duration-200"
              onClick={handlePlayPause}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              className="bg-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
