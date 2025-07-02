import React from "react";

const MatchingWords = ({ words, onWordMatch }) => {
  return (
    <div className="matching-words">
      <h3 className="text-lg font-semibold mb-4">Match the Words</h3>
      <div className="grid grid-cols-2 gap-4">
        {words.map((word, index) => (
          <div
            key={index}
            className="word-item cursor-pointer text-primary hover:underline"
            onClick={() => onWordMatch(word)}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingWords;
