import React from 'react';
import PropTypes from 'prop-types';

/**
 * ResultsSection component displays the final results of the test
 * 
 * @param {Object} props Component props
 * @param {number} props.score Final score
 * @param {number} props.totalQuestions Total number of questions
 * @param {function} props.onClose Callback to close the test
 */
const ResultsSection = ({ score, totalQuestions, onClose }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Test Complete!</h2>
      
      <div className="mb-6">
        <div className="text-5xl font-bold text-blue-600 mb-2">{percentage}%</div>
        <div className="text-lg">You scored {score} out of {totalQuestions}</div>
      </div>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        {percentage >= 80 ? (
          <p>Great job! You have a good understanding of this phoneme.</p>
        ) : percentage >= 60 ? (
          <p>Good work! With a bit more practice, you'll master this phoneme.</p>
        ) : (
          <p>Keep practicing! This phoneme needs a bit more work.</p>
        )}
      </div>
      
      <button 
        onClick={onClose}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

ResultsSection.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ResultsSection;
