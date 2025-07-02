import React from "react";
import { ConsonantLettersRoot } from "./components/ConsonantLettersRoot";
import { PhonemeGrid } from "./components/PhonemeGrid";
import { ActivityTestModal } from "./components/ActivityTest/ActivityTestModal";
import { usePhonemeCards } from "./hooks/usePhonemeCards";
import { useQuizState } from "./hooks/useQuizState";

const ConsonantLetters = ({ activity, className, ...props }) => {
  const { 
    phonemeCards, 
    isLoading, 
    error 
  } = usePhonemeCards();
  
  const {
    activeUnitTest,
    activeSlides,
    quizState,
    handleUnitTestStart,
    handleUnitTestClose,
    handleSectionComplete,
    handleAnswerSelect
  } = useQuizState();

  if (isLoading) return <div>Loading phoneme cards...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ConsonantLettersRoot className={className} {...props}>
      <PhonemeGrid 
        phonemeCards={phonemeCards}
        activeSlides={activeSlides}
        onUnitTestStart={handleUnitTestStart}
      />
      
      {activeUnitTest && (
        <ActivityTestModal
          activeUnitTest={activeUnitTest}
          quizState={quizState}
          onClose={handleUnitTestClose}
          onSectionComplete={handleSectionComplete}
          onAnswerSelect={handleAnswerSelect}
        />
      )}
    </ConsonantLettersRoot>
  );
};

export default ConsonantLetters;
