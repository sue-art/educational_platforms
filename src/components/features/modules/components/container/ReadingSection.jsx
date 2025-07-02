import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReadingQuestion from '../presentational/ReadingQuestion';
import FeedbackMessage from '../presentational/FeedbackMessage';
import ProgressIndicator from '../presentational/ProgressIndicator';

/**
 * ReadingSection container component manages reading comprehension questions
 * 
 * @param {Object} props Component props
 * @param {Array} props.questions List of reading questions
 * @param {function} props.onComplete Callback when reading test is completed with score
 */
const ReadingSection = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswer = (answer, question) => {
    const correct = answer === question.correctAnswer;
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    setUserAnswers([...userAnswers, { 
      questionId: question.id, 
      answer, 
      isCorrect: correct 
    }]);
  };
  
  const handleContinue = () => {
    setShowFeedback(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
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
        variant="fraction"
      />
      
      {!showFeedback ? (
        <ReadingQuestion 
          question={currentQuestion} 
          onAnswer={handleAnswer} 
        />
      ) : (
        <FeedbackMessage 
          isCorrect={isCorrect} 
          correctAnswer={currentQuestion.correctAnswer}
          onContinue={handleContinue} 
        />
      )}
    </div>
  );
};

ReadingSection.propTypes = {
  questions: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default ReadingSection;
