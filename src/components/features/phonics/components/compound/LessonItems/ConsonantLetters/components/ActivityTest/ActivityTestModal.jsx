import React from "react";
import ActivityTestContainer from "../../container/activityTestContainer";
import { ProgressIndicator } from "./ProgressIndicator";
import { WordListSection } from "./WordListSection";
import { QuizSection } from "./QuizSection";

export const ActivityTestModal = ({ 
  activeUnitTest, 
  quizState,
  onClose,
  onSectionComplete,
  onAnswerSelect
}) => {
  const { 
    currentSection, 
    quizStarted, 
    quizCompleted, 
    currentQuestion, 
    quizQuestions,
    showFeedback,
    currentFeedback
  } = quizState;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-0 bg-background flex justify-center items-center">
        <ActivityTestContainer>
          <ProgressIndicator 
            value={(currentQuestion / quizQuestions.length) * 100} 
          />
          
          <h2 className="text-2xl font-bold mb-4">
            {activeUnitTest.title}
          </h2>
          
          <p className="text-gray-700 mb-6">
            {activeUnitTest.description}
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Instructions</h3>
          </div>
          
          <WordListSection 
            phoneme={activeUnitTest.phoneme}
            words={activeUnitTest.examples}
            onContinue={() => {
              onSectionComplete("wordList");
            }}
          />
          
          {quizStarted && !quizCompleted && (
            <QuizSection 
              currentSection={currentSection}
              quizQuestions={quizQuestions}
              currentQuestion={currentQuestion}
              showFeedback={showFeedback}
              currentFeedback={currentFeedback}
              onAnswerSelect={onAnswerSelect}
            />
          )}
        </ActivityTestContainer>
      </div>
    </div>
  );
};
