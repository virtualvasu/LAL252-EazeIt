import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import Navigation from '../Navigation';
import { redirect, useLoaderData } from 'react-router-dom';
import { verifyToken } from '../../utils';

export function loader() {
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    { name: "Relaxing Music 1", file: "/track1.mp3" },
    { name: "Relaxing Music 2", file: "/track2.mp3" },
    { name: "Relaxing Music 3", file: "/track3.mp3" },
    { name: "Relaxing Music 4", file: "/track4.mp3" },
    { name: "Relaxing Music 5", file: "/track5.mp3" },
  ];

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const { currentTime, duration } = audioRef.current;
        setProgress(duration ? (currentTime / duration) * 100 : 0);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex((track) => track.name === currentTrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex].name);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex((track) => track.name === currentTrack);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex].name);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  const handleTrackSelection = (track) => {
    if (currentTrack === track.name && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track.name);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play();
        }
      }, 0);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-6 pt-20"> {/* Added pt-20 to avoid overlap with navbar */}
        <div className="relative text-center mb-6">
          <img src="/music-gif.gif" alt="Music GIF" className="w-full h-52 object-cover" />
          <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-bold">
            Music
          </h2>
        </div>

        {/* Track List */}
        <div className="flex flex-col space-y-4 items-center">
          {tracks.map((track, index) => (
            <button
              key={index}
              className="w-3/4 p-3 text-lg text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ease-in-out flex justify-between items-center"
              onClick={() => handleTrackSelection(track)}
            >
              {track.name}
              <span className="ml-4">
                {currentTrack === track.name && isPlaying ? <FaPause /> : <FaPlay />}
              </span>
            </button>
          ))}
        </div>

        {/* Now Playing Section */}
        <div className="mt-12 p-6 bg-blue-800 rounded-3xl shadow-2xl w-full max-w-lg mx-auto z-10">
          <p className="text-xl text-white text-center mb-4">
            {currentTrack ? `Now Playing: ${currentTrack}` : 'Select a track to play'}
          </p>

          {/* Audio Player */}
          <audio ref={audioRef} src={tracks.find((track) => track.name === currentTrack)?.file} />

          {/* Progress Bar */}
          <div className="w-full bg-blue-600 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-green-500 h-2 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play Control Buttons */}
          <div className="flex justify-around items-center text-white">
            <button
              className="bg-blue-600 p-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
              onClick={handlePrevious}
            >
              <FaStepBackward />
            </button>
            <button
              className="bg-green-500 p-3 rounded-full shadow-md hover:bg-green-600 transition-all duration-200"
              onClick={handlePlayPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="bg-blue-600 p-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
              onClick={handleNext}
            >
              <FaStepForward />
            </button>
          </div>
        </div>
      </div>

      <Navigation />
    </>
  );
};

export default Music;
