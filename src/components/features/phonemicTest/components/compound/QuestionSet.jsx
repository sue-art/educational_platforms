import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create context for the QuestionSet compound component
const QuestionSetContext = createContext();

const QuestionSet = ({ children, onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Handle answering a question
  const handleAnswer = (questionId, answer, isCorrect) => {
    setAnswers((prev) => [...prev, { questionId, answer, isCorrect }]);
  };

  // Move to the next question
  const nextQuestion = () => {
    // Count the number of Question children
    const questionCount = React.Children.toArray(children).filter(
      (child) => child.type.displayName === "QuestionSet.Question"
    ).length;

    if (activeIndex < questionCount - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // All questions answered
      onComplete && onComplete(answers);
    }
  };

  // Context value
  const value = {
    activeIndex,
    handleAnswer,
    nextQuestion,
  };

  return (
    <QuestionSetContext.Provider value={value}>
      <div className="question-set">{children}</div>
    </QuestionSetContext.Provider>
  );
};

// Question subcomponent
const Question = ({ children, index, questionId }) => {
  const { activeIndex, handleAnswer } = useContext(QuestionSetContext);

  // Only render if this is the active question
  if (index !== activeIndex) return null;

  // Pass the handleAnswer function to children
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onAnswer: (answer, isCorrect) =>
          handleAnswer(questionId, answer, isCorrect),
      });
    }
    return child;
  });

  return <div className="question-set-item">{enhancedChildren}</div>;
};

// Controls subcomponent
const Controls = ({ children }) => {
  const { nextQuestion } = useContext(QuestionSetContext);

  // Pass the nextQuestion function to children
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onNext: nextQuestion,
      });
    }
    return child;
  });

  return <div className="question-set-controls">{enhancedChildren}</div>;
};

// Set display names for DevTools
Question.displayName = "QuestionSet.Question";
Controls.displayName = "QuestionSet.Controls";

// Add subcomponents to the main component
QuestionSet.Question = Question;
QuestionSet.Controls = Controls;

// PropTypes
QuestionSet.propTypes = {
  children: PropTypes.node.isRequired,
  onComplete: PropTypes.func,
};

Question.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
};

Controls.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuestionSet;
