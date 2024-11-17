import React, { useState, useEffect } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
// Assuming you have a verifyToken function
import Navigation from '../Navigation';
import { verifyToken } from '../../utils';

export function loader() {
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

const Home = () => {
  const data = useLoaderData();
  console.log("hello", data);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breatheIn, setBreatheIn] = useState(true);
  // console.log('hello')
  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreatheIn(prev => !prev);
      }, 2000);
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
          src="header.jpg"
          alt="Mountain lake"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/30 p-6 flex justify-between items-start">
          <h1 className="text-4xl font-bold text-white">Hi,<br />{data.user.given_name}</h1>
          <div className="w-24 h-24 bg-white rounded-full">
            <img
              src={data.user.picture}
              alt={data.user.given_name}
              className="object-cover rounded-full"
            />
          </div>

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
          {/* Outer circle */}
          <div className={`w-48 h-48 rounded-full bg-blue-500 flex items-center justify-center relative transition-all duration-4000 ease-in-out ${isBreathing ? (breatheIn ? 'scale-110' : 'scale-100') : ''}`}>

            {/* Inner circle */}
            <div className={`absolute w-32 h-32 rounded-full bg-blue-300 flex items-center justify-center transition-all duration-4000 ease-in-out ${isBreathing ? (breatheIn ? 'scale-110' : 'scale-100') : ''}`}>
              <span className="text-white text-xl">{breatheIn ? 'Inhale' : 'Exhale'}</span>
            </div>
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
      <Navigation />

    </div>
  );
};

export default Home;