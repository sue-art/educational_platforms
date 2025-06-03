// literacy-learners-app/src/pages/LearningModulesPage.js
import React from 'react';
import LetterSoundMatchActivity from '../components/activities/LetterSoundMatchActivity';
import PictureWordMatchActivity from '../components/activities/PictureWordMatchActivity'; // Import the new activity

const LearningModulesPage = () => {
  return (
    <div>
      <h2>Learning Modules</h2>

      <LetterSoundMatchActivity />
      <hr style={{ margin: '40px 0' }} /> {/* Separator */}
      <PictureWordMatchActivity />

    </div>
  );
};

export default LearningModulesPage;
