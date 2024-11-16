import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); // Track if an answer has been selected

  const questions = [
    {
      question: "I often feel uninterested in activities I used to enjoy.",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"],
    },
    {
      question: "I feel that my daily energy levels are noticeably low.",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"],
    },
    {
      question: "I frequently feel isolated or disconnected from people around me.",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"],
    },
    {
      question: "I find it hard to concentrate on tasks or make decisions.",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"],
    },
    {
      question: "I often feel sad or hopeless without any specific reason.",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"],
    },
    {
      question: "I struggle with a constant feeling of guilt or self-doubt.",
      options: ["Not at all", "Several Days", "More than Half the days", "Nearly every day"],
    },
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].options[0]) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleFinishQuiz = () => {
    // Logic for finishing the quiz (e.g., navigate to a results page)
    alert(`Your final score: ${score} out of ${questions.length}`);
  };

  return (
    <div className="flex flex-col h-screen bg-indigo-900 p-4">
      {currentQuestion < questions.length ? (
        <>
          {/* Progress Bar */}
          <div className="mb-4 bg-blue-500 h-2 rounded-full">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <h2 className="text-xl text-white mb-4">{questions[currentQuestion].question}</h2>

          {/* Options */}
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-orange-400 transition-all duration-200"
              onClick={() => handleAnswer(option)}
              disabled={answered} // Disable buttons after an answer is selected
            >
              {option}
            </button>
          ))}

          {/* Next Button */}
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
