import React from 'react';
import PropTypes from 'prop-types';

/**
 * FeedbackMessage component displays feedback after answering a question
 * 
 * @param {Object} props Component props
 * @param {boolean} props.isCorrect Whether the answer was correct
 * @param {string} props.correctAnswer The correct answer
 * @param {function} props.onContinue Callback to continue to the next question
 */
const FeedbackMessage = ({ isCorrect, correctAnswer, onContinue }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-center mb-3">
        {isCorrect ? (
          <>
            <span className="text-green-500 text-xl mr-2">✓</span>
            <h3 className="font-semibold">Correct!</h3>
          </>
        ) : (
          <>
            <span className="text-red-500 text-xl mr-2">✗</span>
            <h3 className="font-semibold">Not quite right</h3>
          </>
        )}
      </div>
      
      {!isCorrect && (
        <p className="mb-3">The correct answer is: <strong>{correctAnswer}</strong></p>
      )}
      
      <button 
        onClick={onContinue}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

FeedbackMessage.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default FeedbackMessage;
