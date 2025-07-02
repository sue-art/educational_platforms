import React from "react";
import PropTypes from "prop-types";
import AudioPlayer from "./AudioPlayer";

const QuestionDisplay = ({ prompt, audioPrompt, questionType, difficulty }) => {
  return (
    <div className="question-display">
      <div className="question-metadata">
        <span className="question-type">{questionType}</span>
        <span className="difficulty-level">
          Level: {Array(difficulty).fill("★").join("")}
        </span>
      </div>

      <h2 className="question-prompt">{prompt}</h2>

      {audioPrompt && (
        <div className="audio-prompt">
          <AudioPlayer src={audioPrompt} />
          <p className="audio-instruction">
            Listen to the sound and answer the question
          </p>
        </div>
      )}
    </div>
  );
};

QuestionDisplay.propTypes = {
  prompt: PropTypes.string.isRequired,
  audioPrompt: PropTypes.string,
  questionType: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default QuestionDisplay;
