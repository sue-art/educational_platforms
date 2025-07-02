import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordList component displays a list of words containing the target phoneme
 * 
 * @param {Object} props Component props
 * @param {string} props.phoneme Target phoneme
 * @param {Array} props.words List of words containing the phoneme
 * @param {function} props.onContinue Callback when user wants to continue
 */
const WordList = ({ phoneme, words, onContinue }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Words with the {phoneme} sound</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {words.map((word, index) => (
          <div key={index} className="p-3 bg-blue-50 rounded-md text-center">
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
  words: PropTypes.array.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default WordList;
