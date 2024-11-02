import React, { useState, useEffect } from 'react';

const MeditationApp = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breatheIn, setBreatheIn] = useState(true);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreatheIn(prev => !prev);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  const affirmations = [
    { title: "Don't Start Your Journey", image: "https://v0.dev/placeholder.svg?height=200&width=200" },
    { title: "Gratitude", image: "https://v0.dev/placeholder.svg?height=200&width=200" },
    { title: "4-7-8 Stress Relief", image: "https://v0.dev/placeholder.svg?height=200&width=200" },
    { title: "4-7-8 Stress Relief", image: "https://v0.dev/placeholder.svg?height=200&width=200" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-indigo-900">
      {/* Header Section */}
      <div className="relative h-48">
        <img
          src="https://v0.dev/placeholder.svg?height=400&width=800"
          alt="Mountain lake"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/30 p-6 flex justify-between items-start">
          <h1 className="text-4xl font-bold text-white">Hi,<br />Bruce</h1>
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Affirmations Section */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Affirmartions</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {affirmations.map((item, index) => (
            <div key={index} className="flex-none w-48 bg-indigo-800 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-sm text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breath-in Section */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Breath-in</h2>
        <div className="flex flex-col items-center space-y-6">
          <div 
            className={`w-48 h-48 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-4000 ease-in-out ${
              isBreathing ? (breatheIn ? 'scale-110' : 'scale-100') : ''
            }`}
          >
            <span className="text-white text-xl">{breatheIn ? 'Inhale' : 'Exhale'}</span>
          </div>
          <div className="flex space-x-8">
            <button
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => setIsBreathing(true)}
            >
              Start
            </button>
            <button
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => setIsBreathing(false)}
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto border-t border-indigo-800">
        <div className="flex justify-around py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MeditationApp;