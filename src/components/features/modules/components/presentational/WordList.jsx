import React from "react";
import PropTypes from "prop-types";

/**
 * WordList component displays a list of words containing the target phoneme
 *
 * @param {Object} props Component props
 * @param {string} props.phoneme Target phoneme
 * @param {Object} props.words Object of words with their phoneme breakdowns
 * @param {function} props.onContinue Callback when user wants to continue
 */
const WordList = ({ phoneme, words, onContinue }) => {
  // Convert the words object to an array of entries
  const wordEntries = words ? Object.entries(words) : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Words with the {phoneme} sound</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {wordEntries.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No words found for the phoneme "{phoneme}".
          </p>
        )}
        {wordEntries.map(([word, phonemes], index) => (
          <div
            key={index}
            className="p-3 bg-blue-100 text-blue-800 rounded-md text-center"
          >
            {word}
          </div>
        ))}
      </div>
      <button
        onClick={onContinue}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Continue to Quiz
      </button>
    </div>
  );
};

WordList.propTypes = {
  phoneme: PropTypes.string.isRequired,
  words: PropTypes.object.isRequired, // Changed from array to object
  onContinue: PropTypes.func.isRequired,
};

export default WordList;
