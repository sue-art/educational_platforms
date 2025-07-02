import React, { useState } from "react";
import PropTypes from "prop-types";
import QuizQuestion from "../presentational/QuizQuestion";
import FeedbackMessage from "../presentational/FeedbackMessage";
import ProgressIndicator from "../presentational/ProgressIndicator";

/**
 * QuizSection container component manages quiz questions and answers
 *
 * @param {Object} props Component props
 * @param {Array} props.questions List of quiz questions
 * @param {function} props.onComplete Callback when quiz is completed with score
 */
const QuizSection = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer, question) => {
    const correct = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(answer.toLowerCase())
      : answer.toLowerCase() === question.correctAnswer.toLowerCase();

    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setUserAnswers([
      ...userAnswers,
      {
        questionId: question.id,
        answer,
        isCorrect: correct,
      },
    ]);
  };

  const handleContinue = () => {
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      onComplete(score, userAnswers);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ProgressIndicator
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={score}
        showScore={true}
        variant="dots"
      />

      {!showFeedback ? (
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
      ) : (
        <FeedbackMessage
          isCorrect={isCorrect}
          correctAnswer={
            Array.isArray(currentQuestion.correctAnswer)
              ? currentQuestion.correctAnswer[0]
              : currentQuestion.correctAnswer
          }
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

QuizSection.propTypes = {
  questions: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default QuizSection;
