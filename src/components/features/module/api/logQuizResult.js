/**
 * Log quiz or question result
 *
 * @param {Object} data - Data to log quiz result
 * @param {string} data.userId - The ID of the user
 * @param {string} data.questionId - The ID of the question
 * @param {string} data.phoneme - The phoneme associated with the question
 * @param {string} data.userAnswer - The user's answer
 * @param {boolean} data.isCorrect - Whether the answer was correct
 * @returns {Promise} Promise that resolves when the result is logged
 */
export const logQuizResult = async ({
  userId,
  questionId,
  phoneme,
  userAnswer,
  isCorrect,
}) => {
  // Mock API call
  console.log(
    `Logging quiz result: User ${userId}, Question ${questionId}, Phoneme ${phoneme}, Answer ${userAnswer}, Correct ${isCorrect}`
  );

  // Simulate API response
  return Promise.resolve({ success: true });
};
