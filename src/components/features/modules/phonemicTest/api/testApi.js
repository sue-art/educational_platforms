/**
 * Log a question result to the server
 * 
 * @param {Object} question Question object
 * @param {string} answer User's answer
 * @param {boolean} isCorrect Whether the answer was correct
 * @returns {Promise} API response
 */
export const logQuestionResult = async (question, answer, isCorrect) => {
  try {
    const response = await fetch('/api/log-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        questionId: question.id,
        questionType: question.type || 'reading',
        answer,
        isCorrect,
        timestamp: new Date().toISOString()
      })
    });
    return response.json();
  } catch (error) {
    console.error('Failed to log question result:', error);
    throw error;
  }
};
