/**
 * Generate quiz questions based on phoneme and words
 * 
 * @param {string} phoneme Target phoneme
 * @param {Array} words List of words containing the phoneme
 * @returns {Array} List of quiz questions
 */
export const generateQuizQuestions = (phoneme, words) => {
  const questions = [];
  
  // Example question generation - in a real app, this would be more sophisticated
  // Multiple choice question
  questions.push({
    id: 'q1',
    type: 'multiple-choice',
    text: `Which word contains the ${phoneme} sound?`,
    options: [words[0], 'apple', 'orange', 'banana'],
    correctAnswer: words[0]
  });
  
  // Spelling question
  questions.push({
    id: 'q2',
    type: 'spelling',
    text: `Listen to this word and type it: ${words[1]}`,
    correctAnswer: words[1]
  });
  
  // Add more questions as needed
  questions.push({
    id: 'q3',
    type: 'multiple-choice',
    text: `Which sound do you hear at the beginning of ${words[2]}?`,
    options: ['b', 't', phoneme.replace(/[/]/g, ''), 's'],
    correctAnswer: phoneme.replace(/[/]/g, '')
  });
  
  return questions;
};

/**
 * Generate a story using the target words
 * 
 * @param {string} phoneme Target phoneme
 * @param {Array} words List of words containing the phoneme
 * @returns {string} Generated story
 */
export const generateStory = (phoneme, words) => {
  // In a real app, this would be more sophisticated or use an API
  return `Once upon a time, there was a ${words[0]} who loved to ${words[1]}. 
  Every day, the ${words[0]} would go to the ${words[2]} and play with friends. 
  One day, they found a ${words[3]} and decided to take it home. 
  "What a wonderful ${words[3]}!" said the ${words[0]}. 
  The end.`;
};

/**
 * Generate reading comprehension questions based on the story
 * 
 * @param {string} story Generated story
 * @param {Array} words List of words containing the phoneme
 * @returns {Array} List of reading questions
 */
export const generateReadingQuestions = (story, words) => {
  // In a real app, this would be more sophisticated or use an API
  return [
    {
      id: 'r1',
      text: `Who is the main character in the story?`,
      options: [words[0], words[1], words[2], 'A teacher'],
      correctAnswer: words[0]
    },
    {
      id: 'r2',
      text: `What did the character find?`,
      options: ['A friend', words[3], 'A book', 'A toy'],
      correctAnswer: words[3]
    },
    {
      id: 'r3',
      text: `Where did the character go every day?`,
      options: ['School', 'Home', words[2], 'Library'],
      correctAnswer: words[2]
    }
  ];
};
