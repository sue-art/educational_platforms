// literacy-learners-app/src/components/activities/PictureWordMatchActivity.js
import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/ScoreContext'; // Import useScore
import './PictureWordMatchActivity.css';

const sampleActivityData = { /* ... (keep existing sample data) ... */
  imageRepresentation: '🍎',
  imageDescription: 'An apple',
  wordOptions: [
    { id: 'w1', word: 'Apple', isCorrect: true },
    { id: 'w2', word: 'Banana', isCorrect: false },
    { id: 'w3', word: 'Carrot', isCorrect: false },
  ],
};

const PictureWordMatchActivity = () => {
  const { addPoints } = useScore(); // Get addPoints function
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageDesc, setCurrentImageDesc] = useState('');
  const [wordOptions, setWordOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false); // To prevent adding points multiple times

  useEffect(() => {
    setCurrentImage(sampleActivityData.imageRepresentation);
    setCurrentImageDesc(sampleActivityData.imageDescription);
    setWordOptions(sampleActivityData.wordOptions);
    setSelectedOption(null);
    setFeedbackMessage('');
    setAnsweredCorrectly(false); // Reset for new question
  }, []);

  const handleOptionClick = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    if (option.isCorrect) {
      setFeedbackMessage('Correct! That is an ' + option.word + '.');
      if(!answeredCorrectly) { // Add points only once
        addPoints(10);
        setAnsweredCorrectly(true);
      }
    } else {
      setFeedbackMessage('Not quite, try again!');
    }
  };

  const handleNext = () => {
    setCurrentImage(sampleActivityData.imageRepresentation);
    setCurrentImageDesc(sampleActivityData.imageDescription);
    setWordOptions(sampleActivityData.wordOptions);
    setSelectedOption(null);
    setFeedbackMessage('');
    setAnsweredCorrectly(false); // Reset for next question
    alert("Next question functionality would go here! Resetting for now.");
  }

  return (
    // ... (keep existing JSX, no changes needed here for score logic) ...
    <div className="picture-word-match-activity">
      <h2>Match the Picture to the Word</h2>
      <div className="image-display" role="img" aria-label={currentImageDesc}>
        {currentImage}
      </div>
      <div className="word-options">
        {wordOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`
              word-option-button
              ${selectedOption && option.id === selectedOption.id ? (selectedOption.isCorrect ? 'correct' : 'incorrect') : ''}
              ${selectedOption && option.id !== selectedOption.id && option.isCorrect ? 'correct-missed' : ''}
            `}
          >
            {option.word}
          </button>
        ))}
      </div>
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      {selectedOption && (
         <button onClick={handleNext} className="next-button">Next</button>
      )}
    </div>
  );
};

export default PictureWordMatchActivity;
