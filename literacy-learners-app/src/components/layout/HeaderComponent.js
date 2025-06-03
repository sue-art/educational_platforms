// literacy-learners-app/src/components/layout/HeaderComponent.js
import React from 'react';
import ScoreDisplayComponent from '../gamification/ScoreDisplayComponent'; // Import
import './HeaderComponent.css';

const HeaderComponent = () => {
  return (
    <header className="app-header"> {/* Ensure this class allows for flex if needed */}
      <h1>Literacy Learners</h1>
      <ScoreDisplayComponent /> {/* Add score display */}
    </header>
  );
};

export default HeaderComponent;
