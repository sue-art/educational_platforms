import { useState } from "react";
import { fetchConsonantCardByPhoneme } from "../../api/activityTestApi";

export const useQuizState = () => {
  const [activeUnitTest, setActiveUnitTest] = useState(null);
  const [activeSlides, setActiveSlides] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [currentSection, setCurrentSection] = useState("wordList");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState({
    quizScore: 0,
    readingAccuracy: 0,
    completedSections: [],
  });

  const generateQuizQuestions = async (phoneme) => {
    const questions = await fetchConsonantCardByPhoneme(phoneme);
    if (!questions || questions.length === 0) {
      console.error("No questions found for phoneme:", phoneme);
      return [];
    }
    
    if (!Array.isArray(questions)) {
      console.error("Expected questions to be an array, got:", questions);
      return [];
    }
    
    return questions.map((question, index) => ({
      id: index + 1,
      question: question.question,
      options: question.options,
      answer: question.answer,
    }));
  };

  const handleUnitTestStart = async (card) => {
    console.log("Starting unit test for card:", card);
    setActiveUnitTest(card);
    const questions = await generateQuizQuestions(card.phoneme);
    setCurrentSection("quiz");
    setQuizQuestions(questions);
    setCurrentQuestion(1);
  };

  const handleUnitTestClose = () => {
    setActiveUnitTest(null);
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentSection("wordList");
  };

  const handleSectionComplete = (section, sectionResults = {}) => {
    if (section === "wordList") {
      setQuizStarted(true);
      setQuizCompleted(false);
    }
    
    setResults(prev => ({
      ...prev,
      ...sectionResults,
      completedSections: [...prev.completedSections, section],
    }));
    
    // Logic to determine next section
    if (section === "wordList") setCurrentSection("quiz");
    else if (section === "quiz") setCurrentSection("results");
  };

  const handleAnswerSelect = (option, question) => {
    const isCorrect = option === question.answer;
    
    setCurrentFeedback({
      correct: isCorrect,
      message: isCorrect ? "Correct!" : `Incorrect. The correct answer is ${question.answer}.`,
    });
    
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setQuizCompleted(true);
        handleSectionComplete("quiz", { quizScore: score + (isCorrect ? 1 : 0) });
      }
    }, 1500);
  };

  return {
    activeUnitTest,
    activeSlides,
    quizState: {
      quizQuestions,
      currentQuestion,
      quizStarted,
      quizCompleted,
      showFeedback,
      currentFeedback,
      currentSection,
      score,
      results,
    },
    handleUnitTestStart,
    handleUnitTestClose,
    handleSectionComplete,
    handleAnswerSelect,
  };
};
