import { useMemo } from 'react';
import { generateQuizQuestions, generateStory, generateReadingQuestions } from '../utils/testGenerators';

/**
 * Custom hook to generate test content based on phoneme and words
 * 
 * @param {string} phoneme Target phoneme
 * @param {Array} words List of words containing the phoneme
 * @returns {Object} Generated test content
 */
const useTestGenerator = (phoneme, words) => {
  const quizQuestions = useMemo(() => generateQuizQuestions(phoneme, words), [phoneme, words]);
  
  const story = useMemo(() => generateStory(phoneme, words), [phoneme, words]);
  
  const readingQuestions = useMemo(() => generateReadingQuestions(story, words), [story, words]);
  
  return {
    quizQuestions,
    story,
    readingQuestions
  };
};

export default useTestGenerator;
