import React from "react";
import WordList from "../../presentational/WordList";

export const WordListSection = ({ phoneme, words, onContinue }) => {
  return (
    <WordList
      phoneme={phoneme}
      words={words}
      onContinue={onContinue}
    />
  );
};
