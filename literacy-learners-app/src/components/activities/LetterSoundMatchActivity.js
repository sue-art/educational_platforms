// literacy-learners-app/src/components/activities/LetterSoundMatchActivity.js
import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/ScoreContext'; // Import useScore
import './LetterSoundMatchActivity.css';

const sampleActivityData = { /* ... (keep existing sample data) ... */
  letter: 'A',
  soundOptions: [
    { id: 's1', sound: '/a/ as in Apple', isCorrect: true },
    { id: 's2', sound: '/b/ as in Ball', isCorrect: false },
    { id: 's3', sound: '/k/ as in Cat', isCorrect: false },
  ],
};

const LetterSoundMatchActivity = () => {
  const { addPoints } = useScore(); // Get addPoints function
  const [currentLetter, setCurrentLetter] = useState('');
  const [soundOptions, setSoundOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false); // To prevent adding points multiple times

  useEffect(() => {
    setCurrentLetter(sampleActivityData.letter);
    setSoundOptions(sampleActivityData.soundOptions);
    setSelectedOption(null);
    setFeedbackMessage('');
    setAnsweredCorrectly(false); // Reset for new question
  }, []);

  const handleOptionClick = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    if (option.isCorrect) {
      setFeedbackMessage('Correct! Great job!');
      if (!answeredCorrectly) { // Add points only once
        addPoints(10);
        setAnsweredCorrectly(true);
      }
    } else {
      setFeedbackMessage('Try again!');
    }
  };

  const handleNext = () => {
    setCurrentLetter(sampleActivityData.letter);
    setSoundOptions(sampleActivityData.soundOptions);
    setSelectedOption(null);
    setFeedbackMessage('');
    setAnsweredCorrectly(false); // Reset for next question
    alert("Next question functionality would go here! Resetting for now.");
  }

  return (
    // ... (keep existing JSX, no changes needed here for score logic) ...
    <div className="letter-sound-match-activity">
      <h2>Match the Letter to its Sound</h2>
      <div className="letter-display">{currentLetter}</div>
      <div className="sound-options">
        {soundOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`
              sound-option-button
              ${selectedOption && option.id === selectedOption.id ? (selectedOption.isCorrect ? 'correct' : 'incorrect') : ''}
              ${selectedOption && option.id !== selectedOption.id && option.isCorrect ? 'correct-missed' : ''}
            `}
          >
            {option.sound}
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

export default LetterSoundMatchActivity;
