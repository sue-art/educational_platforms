/**
 * Fetch user activity and performance data
 *
 * @param {string} userId - The ID of the user
 * @returns {Promise} Promise that resolves with the user's activity data
 */
export const fetchUserActivity = async (userId) => {
  console.log(`Fetching activity for User ${userId}`);

  // Simulate API response with mock data
  const mockUserActivity = {
    phonemes: [
      { phoneme: "/b/", timestamp: "2025-06-01T10:00:00Z" },
      { phoneme: "/d/", timestamp: "2025-06-02T12:30:00Z" },
    ],
    questions: [
      {
        question: "What sound does /b/ make?",
        isCorrect: true,
        timestamp: "2025-06-01T10:05:00Z",
      },
      {
        question: "What sound does /d/ make?",
        isCorrect: false,
        timestamp: "2025-06-02T12:35:00Z",
      },
    ],
  };

  // Simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserActivity);
    }, 1000);
  });
};
