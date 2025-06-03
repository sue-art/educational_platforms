// literacy-learners-app/src/context/ScoreContext.js
import React, { createContext, useState, useContext } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const addPoints = (points) => {
    setScore(prevScore => prevScore + points);
  };

  // Could add resetScore, loadScore, etc. later

  return (
    <ScoreContext.Provider value={{ score, addPoints }}>
      {children}
    </ScoreContext.Provider>
  );
};
