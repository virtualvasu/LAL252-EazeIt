import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "How often have you had trouble falling asleep or sleeping too much?",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly everyday"]
    },
    // Add more questions here
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].options[0]) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-indigo-900 p-4">
      {currentQuestion < questions.length ? (
        <>
          <div className="mb-4 bg-blue-500 h-2 rounded-full">
            <div 
              className="bg-orange-500 h-2 rounded-full" 
              style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
            ></div>
          </div>
          <h2 className="text-xl text-white mb-4">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="mb-2 p-2 bg-blue-500 text-white rounded"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </>
      ) : (
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Quiz Completed!</h2>
          <p>Your score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;