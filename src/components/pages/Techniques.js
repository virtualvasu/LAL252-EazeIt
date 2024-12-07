import React, { useState, useRef, useEffect } from 'react';
import Navigation from '../Navigation';

const Techniques = () => {
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
            }
        ],
        Mental: [
            {
                name: "Guided Imagery",
                description: "Follow the instructions in the audio below to perform this mental relaxation technique and visualize calming imagery.",
                audio: "/techniques/mental/guided_imagery.mp3"
            },
            {
                name: "Ventilate Your Feelings",
                description: "Express your thoughts to reduce stress and improve mental well-being. Use the text box below to write your feelings."
            },
            {
                name: "Method of Thought Substitution",
                description: "Follow the instructions in the audio below to challenge and control irrational thoughts to reduce anxiety and stress.",
                audio: "/techniques/mental/thought_subs.mp3"
            },
            {
                name: "Reaching Point of Satiation",
                description: "Write about your mental state of satisfaction and peace below to help you reflect and grow."
            }
        ],
        Behavioral: [
            {
                name: "SMART Goals",
                description: "Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals to focus your efforts and track progress. Use the text box below to write and save your goals."
            },
            {
                name: "Stress Diary",
                description: "Keep track of your stress levels and identify patterns by maintaining a stress diary. Use the text box below to log your daily stress and its triggers."
            },
            {
                name: "Monitor Your Stressors",
                description: "Write down and analyze your stressors to better understand and manage them. Use the text box below to keep a record of your stressors and strategies to cope."
            }
        ]
    };

    const [openTechniques, setOpenTechniques] = useState({});
    const currentAudioRef = useRef(null);

    // State to handle user inputs for all text-based techniques
    const [userInputs, setUserInputs] = useState({});
    const [savedNotes, setSavedNotes] = useState({});

    useEffect(() => {
        // Load saved notes from localStorage
        const storedNotes = JSON.parse(localStorage.getItem('techniqueNotes')) || {};
        setSavedNotes(storedNotes);
    }, []);

    const toggleTechnique = (category, index) => {
        setOpenTechniques((prevState) => ({
            ...prevState,
            [`${category}-${index}`]: !prevState[`${category}-${index}`],
        }));
    };

    const handleAudioPlay = (audioRef) => {
        if (currentAudioRef.current && currentAudioRef.current !== audioRef) {
            currentAudioRef.current.pause();
        }
        currentAudioRef.current = audioRef;
    };

    const handleNoteChange = (key, value) => {
        setUserInputs((prevInputs) => ({
            ...prevInputs,
            [key]: value
        }));
    };

    const handleNoteSubmit = (key) => {
        if (!userInputs[key]?.trim()) return;

        const updatedNotes = {
            ...savedNotes,
            [key]: [...(savedNotes[key] || []), userInputs[key]]
        };
        setSavedNotes(updatedNotes);
        setUserInputs((prevInputs) => ({
            ...prevInputs,
            [key]: ''
        }));
        localStorage.setItem('techniqueNotes', JSON.stringify(updatedNotes));
    };

    const handleDeleteNote = (key, index) => {
        const updatedNotes = {
            ...savedNotes,
            [key]: savedNotes[key].filter((_, i) => i !== index)
        };
        setSavedNotes(updatedNotes);
        localStorage.setItem('techniqueNotes', JSON.stringify(updatedNotes));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white p-8 pb-24">
            <h1 className="text-3xl font-bold text-center mb-8">Stress Management Techniques</h1>

            {Object.entries(techniques).map(([category, techList]) => (
                <div key={category} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{category} Techniques</h2>
                    <div className="bg-indigo-800 p-4 rounded-lg">
                        {techList.map((technique, index) => {
                            const key = `${category}-${index}`;
                            const isOpen = openTechniques[key];
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
                                            {technique.audio ? (
                                                <audio
                                                    controls
                                                    className="w-full"
                                                    onPlay={(e) => handleAudioPlay(e.target)}
                                                >
                                                    <source src={technique.audio} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            ) : (
                                                <div>
                                                    <textarea
                                                        className="w-full p-2 rounded-md text-black mb-2"
                                                        rows="4"
                                                        value={userInputs[key] || ''}
                                                        onChange={(e) => handleNoteChange(key, e.target.value)}
                                                        placeholder="Write your notes here..."
                                                    ></textarea>
                                                    <button
                                                        onClick={() => handleNoteSubmit(key)}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                                                    >
                                                        Submit
                                                    </button>
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold">Your Notes:</h3>
                                                        {savedNotes[key]?.length > 0 ? (
                                                            <ul className="mt-2">
                                                                {savedNotes[key].map((note, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="p-2 bg-indigo-600 rounded-md mb-2 text-white flex justify-between items-center"
                                                                    >
                                                                        {note}
                                                                        <button
                                                                            onClick={() => handleDeleteNote(key, i)}
                                                                            className="hover:text-red-500"
                                                                        >
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm">No notes saved yet.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            <Navigation />
        </div>
    );
};

export default Techniques;
