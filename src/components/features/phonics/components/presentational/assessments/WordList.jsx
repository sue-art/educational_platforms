import React from "react";

const WordList = ({ words, onWordClick }) => {
  return (
    <div className="word-list">
      <h3 className="text-lg font-semibold mb-4">Word List</h3>
      <ul className="list-disc pl-5 space-y-2"></ul>
    </div>
  );
};
export default WordList;
