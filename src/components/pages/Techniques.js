import React, { useState } from 'react';
import Navigation from '../Navigation';  // Ensure you import the Navbar component

const Techniques = () => {
  // Techniques data
  const techniques = {
    Physical: [
      { 
        name: "Progressive Muscle Relaxation", 
        description: "A technique involving tensing and relaxing each muscle group in your body, starting from your toes to your head.", 
        audio: "/audios/pmr.mp3" 
      },
      { 
        name: "Deep Breathing", 
        description: "Focus on slow, deep breaths to calm your body and mind, reducing stress effectively.", 
        audio: "/audios/deep_breathing.mp3" 
      },
    ],
    Mental: [
      { 
        name: "Visualization", 
        description: "Close your eyes and imagine a peaceful place to relax your mind and reduce stress.", 
        audio: "/audios/visualization.mp3" 
      },
      { 
        name: "Mindfulness Meditation", 
        description: "Stay present and observe your thoughts without judgment to promote calmness.", 
        audio: "/audios/mindfulness.mp3" 
      },
    ],
    Behavioral: [
      { 
        name: "Time Management", 
        description: "Plan your day effectively to reduce stress caused by deadlines and workload.", 
        audio: "/audios/time_management.mp3" 
      },
      { 
        name: "Journaling", 
        description: "Write down your thoughts and emotions to process them and relieve stress.", 
        audio: "/audios/journaling.mp3" 
      },
    ],
  };

  // State to track open techniques
  const [openTechniques, setOpenTechniques] = useState({});

  // Toggle technique's open state
  const toggleTechnique = (category, index) => {
    setOpenTechniques((prevState) => ({
      ...prevState,
      [`${category}-${index}`]: !prevState[`${category}-${index}`],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white p-8 pb-24"> {/* Added padding-bottom */}
      <h1 className="text-3xl font-bold text-center mb-8">Stress Management Techniques</h1>

      {Object.entries(techniques).map(([category, techList]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category} Techniques</h2>
          <div className="bg-indigo-800 p-4 rounded-lg">
            {techList.map((technique, index) => {
              const isOpen = openTechniques[`${category}-${index}`];
              return (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => toggleTechnique(category, index)}
                    className="w-full text-left text-lg font-medium bg-indigo-700 py-2 px-4 rounded-md hover:bg-indigo-600 flex justify-between items-center"
                  >
                    {technique.name}
                    <span className="ml-2">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-2 bg-indigo-700 p-4 rounded-md">
                      <p className="mb-2">{technique.description}</p>
                      <audio controls className="w-full">
                        <source src={technique.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Navigation /> {/* Add the Navbar at the bottom */}
    </div>
  );
};

export default Techniques;
