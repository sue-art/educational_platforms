import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * QuizQuestion component displays a single quiz question with options
 * 
 * @param {Object} props Component props
 * @param {Object} props.question Question object
 * @param {function} props.onAnswer Callback when user selects an answer
 */
const QuizQuestion = ({ question, onAnswer }) => {
  const [spellingInput, setSpellingInput] = useState('');
  
  const handleSpellingSubmit = () => {
    onAnswer(spellingInput, question);
    setSpellingInput('');
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">{question.text}</h3>
      
      {question.type === 'multiple-choice' && (
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
      )}
      
      {question.type === 'spelling' && (
        <div className="space-y-3">
          <input
            type="text"
            value={spellingInput}
            onChange={(e) => setSpellingInput(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Type your answer..."
          />
          <button
            onClick={handleSpellingSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['multiple-choice', 'spelling']).isRequired,
    options: PropTypes.array,
    correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default QuizQuestion;
