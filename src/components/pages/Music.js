import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import Navigation from '../Navigation';
import { redirect, useLoaderData } from 'react-router-dom';
import { verifyToken } from '../../utils';

export function loader() {
  try {
    const user = verifyToken();
    return { user };
  } catch (err) {
    console.error('Authentication error:', err.message);
    return redirect('/login');
  }
}

const Music = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    { name: "Relaxing Music 1", file: "/music/music1.mp3" },
    { name: "Relaxing Music 2", file: "/music/music2.mp3" },
    { name: "Relaxing Music 3", file: "/music/music3.mp3" },
    { name: "Relaxing Music 4", file: "/music/music4.mp3" },
    { name: "Relaxing Music 5", file: "/music/music5.mp3" },
    { name: "Relaxing Music 6", file: "/music/music6.mp3" },
    { name: "Relaxing Music 7", file: "/music/music7.mp3" },
    { name: "Relaxing Music 8", file: "/music/music8.mp3" },
    { name: "Relaxing Music 9", file: "/music/music9.mp3" },
    { name: "Relaxing Music 10", file: "/music/music10.mp3" },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-indigo-700 text-white">
      {/* Header Section */}
      <div className="relative text-center mb-6">
        <div className="flex items-center justify-center h-65 bg-gradient-to-b from-indigo-900 to-indigo-700">
          <img src="/music-gif.gif" alt="Music GIF" className="w-auto h-60 object-cover" />
        </div>

        <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
          Music
        </h2>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Track List */}
        <div className="flex flex-col space-y-4 items-center">
          {tracks.map((track, index) => (
            <button
              key={index}
              className="w-3/4 p-3 text-lg bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ease-in-out flex justify-between items-center"
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
        <div className="mt-12 p-6 bg-blue-800 rounded-3xl shadow-2xl w-full max-w-lg mx-auto">
          <p className="text-xl text-center mb-4">
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
          <div className="flex justify-around items-center">
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
    </div>
  );
};

export default Music;
