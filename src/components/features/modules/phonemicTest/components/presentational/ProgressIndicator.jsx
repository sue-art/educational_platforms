import React from 'react';
import PropTypes from 'prop-types';
import './ProgressIndicator.css'; // You'll need to create this CSS file

/**
 * ProgressIndicator component displays the current progress in a phonemic test
 * 
 * @param {Object} props Component props
 * @param {number} props.currentQuestion Current question number (1-based)
 * @param {number} props.totalQuestions Total number of questions in the test
 * @param {number} props.score Current score (optional)
 * @param {boolean} props.showScore Whether to display the score (default: false)
 * @param {string} props.variant Display variant: 'bar' (default), 'dots', or 'fraction'
 */
const ProgressIndicator = ({ 
  currentQuestion, 
  totalQuestions, 
  score, 
  showScore = false,
  variant = 'bar'
}) => {
  // Calculate percentage for progress bar
  const progressPercentage = Math.floor((currentQuestion / totalQuestions) * 100);
  
  // Render different variants of the progress indicator
  const renderProgressIndicator = () => {
    switch(variant) {
      case 'dots':
        return (
          <div className="progress-dots">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index < currentQuestion ? 'completed' : ''} ${index === currentQuestion - 1 ? 'current' : ''}`}
                aria-label={index < currentQuestion ? 'Completed question' : index === currentQuestion - 1 ? 'Current question' : 'Upcoming question'}
              />
            ))}
          </div>
        );
        
      case 'fraction':
        return (
          <div className="progress-fraction">
            <span className="current-question">{currentQuestion}</span>
            <span className="separator">/</span>
            <span className="total-questions">{totalQuestions}</span>
          </div>
        );
        
      case 'bar':
      default:
        return (
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progressPercentage > 10 && (
                <span className="progress-text">{progressPercentage}%</span>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="progress-indicator">
      {renderProgressIndicator()}
      
      {showScore && (
        <div className="score-display">
          <span className="score-label">Score: </span>
          <span className="score-value">{score}</span>
        </div>
      )}
    </div>
  );
};

ProgressIndicator.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  score: PropTypes.number,
  showScore: PropTypes.bool,
  variant: PropTypes.oneOf(['bar', 'dots', 'fraction'])
};

export default ProgressIndicator;
