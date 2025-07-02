import React from "react";

const WordQuiz = ({ questions, onAnswerSubmit, loading }) => {
  return (
    <div className="word-quiz">
      <h2 className="text-2xl font-bold mb-4">Word Quiz</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        questions.map((question, index) => (
          <div key={question.id} className="mb-6">
            <p className="text-lg mb-2">{question.question}</p>
            <ul className="list-disc pl-5 space-y-2">
              {question.options.map((option, optIndex) => (
                <li
                  key={optIndex}
                  className="cursor-pointer text-primary hover:underline"
                  onClick={() => onAnswerSubmit(question.id, option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};
export default WordQuiz;
