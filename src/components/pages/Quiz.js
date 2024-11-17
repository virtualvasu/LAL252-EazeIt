import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); // Track if an answer has been selected

  const questions = [
    {
      question: "I often feel uninterested in activities I used to enjoy.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"]
    },
    {
      question: "I feel that my daily energy levels are noticeably low.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"]
    },
    {
      question: "I frequently feel isolated or disconnected from people around me.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"]
    },
    {
      question: "I find it hard to concentrate on tasks or make decisions.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"]
    },
    {
      question: "I often feel sad or hopeless without any specific reason.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"]
    },
    {
      question: "I struggle with a constant feeling of guilt or self-doubt.",
      options: ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"]
    },
  ];

  const handleAnswer = (answer) => {
    if (!answered) { // Prevent multiple clicks
      const answerIndex = questions[currentQuestion].options.indexOf(answer);
      setScore((prevScore) => prevScore + answerIndex); // Add the score based on the selected option
      setAnswered(true); // Mark the question as answered
    }
  };

  const handleNextQuestion = () => {
    setAnswered(false); // Reset the answered state
    setCurrentQuestion((prevQuestion) => prevQuestion + 1); // Move to the next question
  };

  const calculatePercentage = () => {
    const percentage = (score / (questions.length * 4)) * 100; // Max score is 4 per question
    return percentage.toFixed(1); // Limit to 1 decimal place
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div
        className="flex justify-center items-center text-white h-1/3 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/header2.jpg)' // Replace with the correct image path
        }}
      >
        <h1 className="text-4xl font-bold">Customise your experience</h1>
      </div>

      {/* Quiz Content */}
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
                  className={`w-full p-4 text-lg bg-[#5c4d77] text-white rounded-lg ${
                    answered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500'
                  } transition-all duration-300`}
                  onClick={() => handleAnswer(option)}
                  disabled={answered} // Disable button after answering
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
            <p className="text-xl mb-8">Your stress level: {calculatePercentage()}%</p>
            <button
              className="w-full p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-all duration-300"
              onClick={() => window.location.reload()} // Reset the quiz
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
