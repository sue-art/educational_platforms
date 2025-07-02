/**
 * Log phoneme practice
 *
 * @param {Object} data - Data to log phoneme practice
 * @param {string} data.userId - The ID of the user
 * @param {string} data.phoneme - The phoneme practiced
 * @returns {Promise} Promise that resolves when the practice is logged
 */
export const logPhonemePractice = async ({ userId, phoneme }) => {
  // Mock API call
  console.log(`Logging phoneme practice: User ${userId}, Phoneme ${phoneme}`);

  // Simulate API response
  return Promise.resolve({ success: true });
};
