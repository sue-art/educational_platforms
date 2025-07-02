// src/features/modules/api/modulesApi.js

/**
 * API functions for modules
 */

// Mock data for development
const mockModuleData = [
  {
    id: "phonemic-awareness",
    title: "Phonemic Awareness",
    description:
      "Focuses on the sounds of individual letters and how they combine to form words.",
    activities: [
      {
        id: "activity-101",
        title: "Consonant Sounds & Letters",
        description:
          "Students learn the sounds of individual consonants and how they combine to form words.",
        instructions: [
          "Introduce each consonant sound with its corresponding letter.",
          "Use visual aids like flashcards to reinforce learning.",
          "Practice identifying consonant sounds in words.",
        ],
        materials: ["Flashcards", "Sound charts", "Worksheets"],
        component: "ConsonantLetters",
      },
      {
        id: "activity-102",
        title: "Consonant Sounds & Letters",
        description:
          "Students learn the sounds of individual consonants and how they combine to form words.",
        instructions: [
          "Introduce each consonant sound with its corresponding letter.",
          "Use visual aids like flashcards to reinforce learning.",
          "Practice identifying consonant sounds in words.",
        ],
        materials: ["Flashcards", "Sound charts", "Worksheets"],
        component: "ConsonantSounds",
      },
      {
        id: "activity-103",
        title: "Vowel Sounds & Letters",
        description:
          "Students learn the sounds of individual vowels and how they combine to form words.",
        instructions: [
          "Introduce each vowel sound with its corresponding letter.",
          "Use visual aids like flashcards to reinforce learning.",
          "Practice identifying vowel sounds in words.",
        ],
        materials: ["Flashcards", "Sound charts", "Worksheets"],
        component: "VowelSounds",
      },
      // ... other activities
    ],
  },
  {
    id: "module-2",
    title: "Phonics Progression",
    description:
      "Introducing letters and sounds, blending and segmenting, decoding and encoding, and progression in phonics.",
    teachingStrategies: [
      "Explicit Instruction",
      "Systematic Instruction",
      "Blending and Segmenting",
    ],
    activities: [
      // ... activities
    ],
  },
];

/**
 * Fetch all modules
 *
 * @returns {Promise} Promise that resolves with the modules data
 */
export const fetchModules = async () => {
  // In a real application, this would be an API call:
  // const response = await api.get('/modules');
  // return response.data;

  // For development, return mock data
  return Promise.resolve(mockModuleData);
};

/**
 * Fetch a specific module by ID
 *
 * @param {string} moduleId - Module ID
 * @returns {Promise} Promise that resolves with the module data
 */
export const fetchModuleById = async (moduleId) => {
  // In a real application:
  // const response = await api.get(`/modules/${moduleId}`);
  // return response.data;

  // For development, return mock data
  const module = mockModuleData.find((m) => m.id === moduleId);
  return Promise.resolve(module || null);
};
