// phonemicApi.

import phonemeCards from "./consonant-sound-letters.json";

// Mock phoneme data
const mockPhonemeData = phonemeCards;

/**
 * Fetch all phoneme cards
 *
 * @returns {Promise} Promise that resolves with the phoneme cards data
 */
export const fetchPhonemeCards = async () => {
  // In a real application, this would be an API call:
  // const response = await api.get('/phoneme-cards');
  // return response.data;

  // For development, return mock data
  return Promise.resolve(mockPhonemeData.phonemeCards);
};

/**
 * Fetch a specific phoneme card by phoneme
 *
 * @param {string} phoneme - The phoneme to fetch
 * @returns {Promise} Promise that resolves with the phoneme card data
 */
export const fetchPhonemeCardByPhoneme = async (phoneme) => {
  // In a real application:
  // const response = await api.get(`/phoneme-cards/${phoneme}`);
  // return response.data;

  // For development, return mock data
  const phonemeCard = mockPhonemeData.phonemeCards.find(
    (card) => card.phoneme === phoneme
  );
  return Promise.resolve(phonemeCard || null);
};
