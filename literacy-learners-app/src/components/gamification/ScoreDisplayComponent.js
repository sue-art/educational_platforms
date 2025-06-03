// literacy-learners-app/src/components/gamification/ScoreDisplayComponent.js
import React from 'react';
import { useScore } from '../../context/ScoreContext';
import './ScoreDisplayComponent.css';

const ScoreDisplayComponent = () => {
  const { score } = useScore();

  return (
    <div className="score-display">
      Points: {score}
    </div>
  );
};

export default ScoreDisplayComponent;
