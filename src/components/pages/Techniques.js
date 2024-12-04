import React, { useState } from 'react';
import Navigation from '../Navigation';  // Ensure you import the Navbar component

const Techniques = () => {
    // Techniques data
    const techniques = {
        Physical: [
            {
                name: "Deep Breathing",
                description: "Follow the instructions in the audio below to perform this physical relaxation technique.",
                audio: "/techniques/physical/deep_breathing.mp3"
            },
            {
                name: "Exhalation Breathing",
                description: "Follow the instructions in the audio below to perform this physical relaxation technique.",
                audio: "/techniques/physical/exhalation_breathing.mp3"
            },
            {
                name: "Stretching Exercise",
                description: "Follow the instructions in the audio below to perform this physical relaxation technique.",
                audio: "/techniques/physical/stretching_exercise.mp3"
            },
            {
                name: "Pranayama",
                description: "Follow the instructions in the audio below to perform this physical relaxation technique.",
                audio: "/techniques/physical/pranayama.mp3"
            },
            {
                name: "Progressive Muscle Relaxation",
                description: "Follow the instructions in the audio below to perform this physical relaxation technique.",
                audio: "/techniques/physical/pmr.mp3"
            },
        ]
        ,
        Mental: [
            
            
            {
                name: "Guided Imagery",
                description: "Follow the instructions in the audio below to perform this mental relaxation technique and visualize calming imagery.",
                audio: "/techniques/mental/guided_imagery.mp3"
            },
            {
                name: "Ventilate Your Feelings",
                description: "Follow the instructions in the audio below to express and release your feelings to reduce stress and promote mental well-being.",
                audio: "/techniques/mental/ventilate_your_feelings.mp3"
            },
            {
                name: "Method of Thought Substitution",
                description: "Follow the instructions in the audio below to challenge and control irrational thoughts to reduce anxiety and stress.",
                audio: "/techniques/mental/thought_subs.mp3"
            },
            {
                name: "Reaching Point of Satiation",
                description: "Follow the instructions in the audio below to help you identify and reach a mental state of satisfaction and peace.",
                audio: "/techniques/mental/reaching_point_of_satiation.mp3"
            }
        ]
        // ,
        // Behavioral: [
        //     {
        //         name: "Time Management",
        //         description: "Plan your day effectively to reduce stress caused by deadlines and workload.",
        //         audio: "/audios/time_management.mp3"
        //     },
        //     {
        //         name: "Journaling",
        //         description: "Write down your thoughts and emotions to process them and relieve stress.",
        //         audio: "/audios/journaling.mp3"
        //     },
        // ],
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
