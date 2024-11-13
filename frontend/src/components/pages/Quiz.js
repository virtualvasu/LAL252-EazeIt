import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); // Track if an answer has been selected

  const questions = [
    {
      question: "How often have you had trouble falling asleep or sleeping too much?",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"]
    },
    {
      question: "Do you often feel tired or have little energy?",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"]
    },
    // Add more questions here
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].options[0]) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnswered(true); // Mark that an answer has been selected
  };

  const handleNextQuestion = () => {
    setAnswered(false); // Reset answered state for the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleFinishQuiz = () => {
    // Logic for finishing the quiz
    // For now, it just shows the score
  };

  return (
    <div className="flex flex-col h-screen bg-indigo-900 p-4">
      {currentQuestion < questions.length ? (
        <>
          <div className="mb-4 bg-blue-500 h-2 rounded-full">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <h2 className="text-xl text-white mb-4">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-orange-400 transition-all duration-200"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
          
          {/* Show "Next" button after an answer is selected */}
          {answered && (
            <button
              className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-400 transition-all duration-200"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </>
      ) : (
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Quiz Completed!</h2>
          <p>Your score: {score} out of {questions.length}</p>
          {/* Show "Finish Quiz" button after quiz is completed */}
          <button
            className="mt-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition-all duration-200"
            onClick={handleFinishQuiz}
          >
            See Final Score
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
