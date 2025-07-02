import { useState } from 'react';

/**
 * Custom hook to manage test progress
 * 
 * @returns {Object} Test progress state and handlers
 */
const useTestProgress = () => {
  const [testPhase, setTestPhase] = useState('wordList'); // wordList, quiz, story, reading, results
  const [quizScore, setQuizScore] = useState(0);
  const [readingScore, setReadingScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [readingAnswers, setReadingAnswers] = useState([]);
  
  const handleQuizComplete = (score, answers) => {
    setQuizScore(score);
    setQuizAnswers(answers);
    setTestPhase('story');
  };
  
  const handleReadingComplete = (score, answers) => {
    setReadingScore(score);
    setReadingAnswers(answers);
    setTestPhase('results');
  };
  
  const getTotalScore = () => quizScore + readingScore;
  const getTotalQuestions = (quizQuestions, readingQuestions) => 
    quizQuestions.length + readingQuestions.length;
  
  return {
    testPhase,
    setTestPhase,
    quizScore,
    readingScore,
    quizAnswers,
    readingAnswers,
    handleQuizComplete,
    handleReadingComplete,
    getTotalScore,
    getTotalQuestions
  };
};

export default useTestProgress;
