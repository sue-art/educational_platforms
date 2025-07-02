import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTestContext } from "../../context/TestContext";
import QuestionDisplay from "../presentational/QuestionDisplay";
import OptionButton from "../presentational/OptionButton";
import FeedbackMessage from "../presentational/FeedbackMessage";

const QuestionContainer = ({ question }) => {
  const { answerQuestion, useHint, nextQuestion } = useTestContext();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleOptionSelect = (option) => {
    if (!selectedOption && !showResult) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === question.correctAnswer;
    answerQuestion(question.questionId, selectedOption, isCorrect);
    setShowResult(true);
  };

  const handleHint = () => {
    setShowHint(true);
    useHint(question.questionId);
  };

  const handleContinue = () => {
    nextQuestion();
    // Reset state for next question
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
  };

  const getFeedbackMessage = () => {
    if (!showResult) return null;

    const isCorrect = selectedOption === question.correctAnswer;
    return isCorrect ? question.feedback.correct : question.feedback.incorrect;
  };

  return (
    <div className="question-container">
      <h1>Question Display</h1>
      <QuestionDisplay
        prompt={question.prompt}
        audioPrompt={question.audioPrompt}
        questionType={question.questionType}
        difficulty={question.difficulty}
      />

      <div className="options-grid">
        <h1>Quesiton Option Buttons</h1>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            selected={selectedOption === option}
            correct={option === question.correctAnswer}
            showResult={showResult}
            onClick={handleOptionSelect}
          />
        ))}
      </div>

      <div className="question-actions">
        {!showResult && (
          <>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Check Answer
            </button>

            {!showHint && (
              <button className="hint-button" onClick={handleHint}>
                Hint
              </button>
            )}
          </>
        )}

        {showHint && !showResult && (
          <div className="hint-display">
            <p>{question.hints[0]}</p>
          </div>
        )}
      </div>

      {showResult && (
        <FeedbackMessage
          isCorrect={selectedOption === question.correctAnswer}
          message={getFeedbackMessage()}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

QuestionContainer.propTypes = {
  question: PropTypes.shape({
    questionId: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    prompt: PropTypes.string.isRequired,
    audioPrompt: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.string).isRequired,
    feedback: PropTypes.shape({
      correct: PropTypes.string.isRequired,
      incorrect: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default QuestionContainer;
