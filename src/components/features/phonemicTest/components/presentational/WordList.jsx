// In WordList.jsx
import React from "react";
import PropTypes from "prop-types";

const WordList = ({ words, consonantFocus, onComplete }) => {
  // Check if words is properly formatted
  if (!words || !Array.isArray(words) || words.length === 0) {
    console.warn("WordList: No words data provided or incorrect format");
  }

  return (
    <div className="word-list-container">
      <h2>Words with the "{consonantFocus}" sound</h2>
      <ul className="word-list">
        {words.map((wordItem, index) => (
          <li key={index} className="word-item">
            <span className="word">{wordItem.word}</span>
            {wordItem.phonemes && (
              <span className="phonemes">/{wordItem.phonemes}/</span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={onComplete} className="btn-next">
        Continue
      </button>
    </div>
  );
};

WordList.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      phonemes: PropTypes.string,
    })
  ),
  consonantFocus: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
};

export default WordList;
