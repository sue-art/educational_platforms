import React from "react";
import PropTypes from "prop-types";

const OptionButton = ({ option, selected, correct, showResult, onClick }) => {
  // Determine button class based on state
  let buttonClass =
    "option-button p-4 rounded-lg text-lg font-semibold transition-colors duration-200";

  if (showResult) {
    if (selected && correct) {
      buttonClass += " correct";
    } else if (selected && !correct) {
      buttonClass += " incorrect";
    } else if (!selected && correct) {
      buttonClass += " highlight-correct";
    }
  } else if (selected) {
    buttonClass += " selected";
  }

  return (
    <button
      className={buttonClass}
      onClick={() => onClick(option)}
      disabled={showResult}
    >
      {option}
    </button>
  );
};

OptionButton.propTypes = {
  option: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  correct: PropTypes.bool.isRequired,
  showResult: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OptionButton;
