import React from 'react';
import PropTypes from 'prop-types';

/**
 * ReadingQuestion component displays a reading comprehension question
 * 
 * @param {Object} props Component props
 * @param {Object} props.question Reading question object
 * @param {function} props.onAnswer Callback when user selects an answer
 */
const ReadingQuestion = ({ question, onAnswer }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="w-full p-3 text-left border rounded-md hover:bg-gray-50"
            onClick={() => onAnswer(option, question)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

ReadingQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    correctAnswer: PropTypes.string.isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default ReadingQuestion;
