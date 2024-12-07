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
            },
            {
                name: "Progressive Muscle Relaxation",
                description: "Follow the instructions in the audio below to perform this physical relaxation technique.",
                audio: "/techniques/physical/pmr.mp3"
            },
        ],
        Mental: [
            {
                name: "Guided Imagery",
                description: "Follow the instructions in the audio below to perform this mental relaxation technique and visualize calming imagery.",
                audio: "/techniques/mental/guided_imagery.mp3"
            },
            {
                name: "Ventilate Your Feelings",
                description: "Express your thoughts to reduce stress and improve mental well-being. Use the text box below to write your feelings.",
            },
            {
                name: "Method of Thought Substitution",
                description: "Follow the instructions in the audio below to challenge and control irrational thoughts to reduce anxiety and stress.",
                audio: "/techniques/mental/thought_subs.mp3"
            },
            {
                name: "Reaching Point of Satiation",
                description: "Write about your mental state of satisfaction and peace below to help you reflect and grow.",
            }
        ],
    };

    const [openTechniques, setOpenTechniques] = useState({});
    const currentAudioRef = useRef(null);

    // States for user input
    const [ventilateThoughts, setVentilateThoughts] = useState('');
    const [satiationThoughts, setSatiationThoughts] = useState('');
    const [savedVentilateThoughts, setSavedVentilateThoughts] = useState([]);
    const [savedSatiationThoughts, setSavedSatiationThoughts] = useState([]);

    // Load saved thoughts from local storage on mount
    useEffect(() => {
        const storedVentilate = JSON.parse(localStorage.getItem('ventilateThoughts')) || [];
        const storedSatiation = JSON.parse(localStorage.getItem('satiationThoughts')) || [];
        setSavedVentilateThoughts(storedVentilate);
        setSavedSatiationThoughts(storedSatiation);
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

    // Handle submission for thoughts
    const handleThoughtSubmit = (type) => {
        if (type === "ventilate") {
            if (ventilateThoughts.trim() === '') return;
            const updatedVentilate = [...savedVentilateThoughts, ventilateThoughts];
            setSavedVentilateThoughts(updatedVentilate);
            setVentilateThoughts('');
            localStorage.setItem('ventilateThoughts', JSON.stringify(updatedVentilate));
        } else if (type === "satiation") {
            if (satiationThoughts.trim() === '') return;
            const updatedSatiation = [...savedSatiationThoughts, satiationThoughts];
            setSavedSatiationThoughts(updatedSatiation);
            setSatiationThoughts('');
            localStorage.setItem('satiationThoughts', JSON.stringify(updatedSatiation));
        }
    };

    // Handle deletion for thoughts
    const handleDeleteThought = (type, index) => {
        if (type === "ventilate") {
            const updatedVentilate = savedVentilateThoughts.filter((_, i) => i !== index);
            setSavedVentilateThoughts(updatedVentilate);
            localStorage.setItem('ventilateThoughts', JSON.stringify(updatedVentilate));
        } else if (type === "satiation") {
            const updatedSatiation = savedSatiationThoughts.filter((_, i) => i !== index);
            setSavedSatiationThoughts(updatedSatiation);
            localStorage.setItem('satiationThoughts', JSON.stringify(updatedSatiation));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white p-8 pb-24">
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
                                            {technique.name === "Ventilate Your Feelings" ? (
                                                <div>
                                                    <textarea
                                                        className="w-full p-2 rounded-md text-black mb-2"
                                                        rows="4"
                                                        value={ventilateThoughts}
                                                        onChange={(e) => setVentilateThoughts(e.target.value)}
                                                        placeholder="Write down your feelings..."
                                                    ></textarea>
                                                    <button
                                                        onClick={() => handleThoughtSubmit("ventilate")}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                                                    >
                                                        Submit
                                                    </button>
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold">Your Thoughts:</h3>
                                                        {savedVentilateThoughts.length > 0 ? (
                                                            <ul className="mt-2">
                                                                {savedVentilateThoughts.map((thought, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="p-2 bg-indigo-600 rounded-md mb-2 text-white flex justify-between items-center"
                                                                    >
                                                                        {thought}
                                                                        <button
                                                                            onClick={() => handleDeleteThought("ventilate", i)}
                                                                            className="hover:text-red-500"
                                                                        >
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm">No thoughts saved yet.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : technique.name === "Reaching Point of Satiation" ? (
                                                <div>
                                                    <textarea
                                                        className="w-full p-2 rounded-md text-black mb-2"
                                                        rows="4"
                                                        value={satiationThoughts}
                                                        onChange={(e) => setSatiationThoughts(e.target.value)}
                                                        placeholder="Write down your thoughts..."
                                                    ></textarea>
                                                    <button
                                                        onClick={() => handleThoughtSubmit("satiation")}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                                                    >
                                                        Submit
                                                    </button>
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold">Your Reflections:</h3>
                                                        {savedSatiationThoughts.length > 0 ? (
                                                            <ul className="mt-2">
                                                                {savedSatiationThoughts.map((thought, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="p-2 bg-indigo-600 rounded-md mb-2 text-white flex justify-between items-center"
                                                                    >
                                                                        {thought}
                                                                        <button
                                                                            onClick={() => handleDeleteThought("satiation", i)}
                                                                            className="hover:text-red-500"
                                                                        >
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm">No reflections saved yet.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                technique.audio && (
                                                    <audio
                                                        controls
                                                        className="w-full"
                                                        onPlay={(e) => handleAudioPlay(e.target)}
                                                    >
                                                        <source src={technique.audio} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )
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
