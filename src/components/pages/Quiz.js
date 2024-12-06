import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { verifyToken } from '../../utils'; // Ensure this function is implemented
import Navigation from '../Navigation';

// Loader function for token verification
export function loader() {
  try {
    const user = verifyToken(); // Replace with your actual token validation logic
    return { user };
  } catch (err) {
    console.error('Authentication error:', err.message);
    return redirect('/login'); // Redirect to login if token is invalid
  }
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // Start at -1 to show instructions first
  const [scores, setScores] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    "I found it hard to wind down",
    "I was aware of dryness of my mouth",
    "I couldn’t seem to experience any positive feeling at all",
    "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
    "I found it difficult to work up the initiative to do things",
    "I tended to over-react to situations",
    "I experienced trembling (e.g. in the hands)",
    "I felt that I was using a lot of nervous energy",
    "I was worried about situations in which I might panic and make a fool of myself",
    "I felt that I had nothing to look forward to",
    "I found myself getting agitated",
    "I found it difficult to relax",
    "I felt down-hearted and blue",
    "I was intolerant of anything that kept me from getting on with what I was doing",
    "I felt I was close to panic",
    "I was unable to become enthusiastic about anything",
    "I felt I wasn’t worth much as a person",
    "I felt that I was rather touchy",
    "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)",
    "I felt scared without any good reason",
    "I felt that life was meaningless"
  ];

  const options = [
    { label: "Did not apply to me at all", value: 0 },
    { label: "Applied to me to some degree, or some of the time", value: 1 },
    { label: "Applied to me to a considerable degree or a good part of time", value: 2 },
    { label: "Applied to me very much or most of the time", value: 3 }
  ];

  const handleAnswer = (score) => {
    setScores([...scores, score]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScores = () => {
    const depression = scores.filter((_, i) => [2, 4, 10, 13, 15, 16, 20].includes(i)).reduce((a, b) => a + b, 0) * 2;
    const anxiety = scores.filter((_, i) => [1, 3, 6, 8, 9, 14, 19].includes(i)).reduce((a, b) => a + b, 0) * 2;
    const stress = scores.filter((_, i) => [0, 5, 7, 11, 12, 17, 18].includes(i)).reduce((a, b) => a + b, 0) * 2;

    return { depression, anxiety, stress };
  };

  const renderRecommendation = (score, type) => {
    const thresholds = {
      depression: [9, 13, 20, 27],
      anxiety: [7, 9, 14, 19],
      stress: [14, 18, 25, 33]
    };

    const labels = ["Normal", "Mild", "Moderate", "Severe", "Extremely Severe"];
    const index = thresholds[type].findIndex((threshold) => score <= threshold);
    return labels[index === -1 ? labels.length - 1 : index];
  };

  if (quizCompleted) {
    const { depression, anxiety, stress } = calculateScores();
    return (
      <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-0">
        <div className="flex flex-col items-center justify-center px-4 py-6 text-center bg-gradient-to-b from-blue-50 to-blue-100 h-full">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Quiz Completed!</h2>
          <p className="text-lg font-medium text-blue-800 mb-4">DASS Scores:</p>
          <p className="text-lg">Depression: {depression} ({renderRecommendation(depression, "depression")})</p>
          <p className="text-lg">Anxiety: {anxiety} ({renderRecommendation(anxiety, "anxiety")})</p>
          <p className="text-lg">Stress: {stress} ({renderRecommendation(stress, "stress")})</p>
          <button
            className="w-full max-w-xs p-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-400 active:bg-yellow-600 transition-all duration-300 mt-6"
            onClick={() => window.location.reload()}
          >
            Retry Quiz
          </button>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-0">
      <div className="flex justify-center items-center text-white h-1/3 bg-cover bg-center bg-opacity-70">
        <h1 className="text-4xl font-bold drop-shadow-lg">DASS-21 Quiz</h1>
      </div>
      {currentQuestion === -1 ? (
        <div className="flex flex-col items-center justify-center text-center flex-grow bg-indigo-900 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl mb-6 text-white">
            Please read each statement and circle a number 0, 1, 2 or 3 which indicates how much the statement applied to you over the past week. There are no right or wrong answers. Do not spend too much time on any statement.
          </h2>
          <button
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
            onClick={() => setCurrentQuestion(0)}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="flex flex-col p-8 text-white font-sans bg-indigo-900 flex-grow">
          <h2 className="text-lg mb-6">{questions[currentQuestion]}</h2>
          <div className="space-y-4">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full p-4 text-lg bg-[#5c4d77] text-white rounded-lg shadow-md hover:bg-purple-500 transition-all duration-300"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
