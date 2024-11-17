import React, { useState } from 'react';
import Navigation from '../Navigation';
import { redirect, useLoaderData } from 'react-router-dom';
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

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); // Track if an answer has been selected
  const [started, setStarted] = useState(false); // Track if quiz has started

  const questions = [
    {
      question: "I often feel uninterested in activities I used to enjoy.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"],
    },
    {
      question: "I feel that my daily energy levels are noticeably low.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"],
    },
    {
      question: "I frequently feel isolated or disconnected from people around me.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"],
    },
    {
      question: "I find it hard to concentrate on tasks or make decisions.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"],
    },
    {
      question: "I often feel sad or hopeless without any specific reason.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"],
    },
    {
      question: "I struggle with a constant feeling of guilt or self-doubt.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"],
    },
  ];

  const handleAnswer = (answer) => {
    if (!answered) {
      const answerIndex = questions[currentQuestion].options.indexOf(answer);
      setScore((prevScore) => prevScore + answerIndex);
      setAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const calculatePercentage = () => {
    const percentage = (score / (questions.length * 4)) * 100;
    return percentage.toFixed(1);
  };

  const startQuiz = () => {
    setStarted(true);
  };

  const stressPercentage = calculatePercentage();

  const getRecommendation = () => {
    if (stressPercentage < 25) {
      return (
        <div className="recommendation-box bg-green-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Recommendation:</h3>
          <p>Try doing deep breathing exercises to calm your mind.</p>
        </div>
      );
    } else if (stressPercentage >= 25 && stressPercentage < 50) {
      return (
        <div className="recommendation-box bg-blue-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Recommendation:</h3>
          <p>Visit the music section of our app for some relaxing tunes.</p>
        </div>
      );
    } else if (stressPercentage >= 50 && stressPercentage < 75) {
      return (
        <div className="recommendation-box bg-yellow-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Recommendation:</h3>
          <p>Watch this calming video to help reduce stress:</p>
          <a
            href="https://www.youtube.com/watch?v=RcGyVTAoXEU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Watch now
          </a>
        </div>
      );
    } else {
      return (
        <div className="recommendation-box bg-red-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Recommendation:</h3>
          <p>Watch this inspiring video to lift your spirits:</p>
          <a
            href="https://www.youtube.com/watch?v=TEwoWxLwCfA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Watch now
          </a>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-800 to-purple-900">
      <div
        className="flex justify-center items-center text-white h-1/3 bg-cover bg-center bg-opacity-70"
        style={{ backgroundImage: 'url(/header2.jpg)' }}
      >
        <h1 className="text-4xl font-bold drop-shadow-lg">Customize Your Experience</h1>
      </div>

      {!started && (
        <div className="flex flex-col items-center justify-center text-center flex-grow bg-indigo-900 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl mb-6 text-white">Are you ready to begin the quiz?</h2>
          <button
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      )}

      {started && (
        <div className="flex flex-col p-8 text-white font-sans bg-indigo-900 flex-grow">
          <div className="mb-6">
            <div className="w-full bg-[#3e2a57] h-2 rounded-full">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {currentQuestion < questions.length ? (
            <>
              <h2 className="text-lg mb-6">{questions[currentQuestion].question}</h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full p-4 text-lg bg-[#5c4d77] text-white rounded-lg shadow-md ${
                      answered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500'
                    } transition-all duration-300`}
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <button
                  className="mt-6 w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all duration-300"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl mb-6">Quiz Completed!</h2>
              <p className="text-xl mb-8">Your stress level: {stressPercentage}%</p>
              <div className="mb-6">{getRecommendation()}</div>
              <button
                className="w-full p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                Retry Quiz
              </button>
            </div>
          )}
        </div>
      )}
      <Navigation/>
    </div>
  );
};

export default Quiz;
