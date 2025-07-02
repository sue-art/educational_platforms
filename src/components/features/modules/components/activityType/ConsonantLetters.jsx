// Main Component
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PhonemeCardWithDrawer from "../presentational/PhonemeCardWithDrawer";
import ActivityTestContainer from "../container/activityTestContainer";
import ConsonantUnitTest from "../container/ConsonantUnitTest";
import { Progress } from "@/components/ui/progress";

import {
  fetchPhonemeCards,
  fetchPhonemeCardByPhoneme,
} from "../../api/phonemicApi";
import WordList from "../presentational/WordList";

import { fetchConsonantCardByPhoneme } from "../../api/activityTestApi";

import QuizSection from "../container/QuizSection";

/**
 * ConsonantSounds activity component
 *
 * @param {Object} props - Component props
 * @param {Object} props.activity - Activity data
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Rendered component
 */
const ConsonantLetters = ({ activity, className, ...props }) => {
  const [phonemeCards, setPhonemeCards] = useState([]);
  const [activeSlides, setActiveSlides] = useState({});
  const [activeUnitTest, setActiveUnitTest] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [readingTestStarted, setReadingTestStarted] = useState(false);
  const [readingTestCompleted, setReadingTestCompleted] = useState(false);
  const [readingTestResults, setReadingTestResults] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const [currentSection, setCurrentSection] = useState("wordList");
  const [results, setResults] = useState({
    quizScore: 0,
    readingAccuracy: 0,
    completedSections: [],
  });

  /*use memo to render quiz questions only once */

  useEffect(() => {
    const loadQuizQuestions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPhonemeCards();
        setPhonemeCards(data);

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading phoneme cards:", err);
        setError("Failed to load phoneme cards");
        setIsLoading(false);
      }
    };
    loadQuizQuestions();
  }, []);

  const colors = [
    "bg-amber-200",
    "bg-emerald-200",
    "bg-amber-300",
    "bg-emerald-500",
    "bg-amber-300",
    "bg-emerald-500",
    "bg-amber-200",
    "bg-emerald-200",
  ];

  const generateQuizQuestions = async (phoneme) => {
    const questions = await fetchConsonantCardByPhoneme(phoneme);
    if (!questions || questions.length === 0) {
      console.error("No questions found for phoneme:", phoneme);
      return [];
    }
    // Map questions to the expected format
    // Assuming questions is an array of objects with properties: question, options, answer
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
  };
  // Render the current question
  const renderCurrentQuestion = () => {
    const questions =
      currentSection === "quiz" ? quizQuestions : readingQuestions;
    console.log("Rendering question:", currentQuestion, "of", questions.length);
    if (
      !questions ||
      questions.length === 0 ||
      currentQuestion >= questions.length
    ) {
      return <div>No questions available</div>;
    }

    const question = questions[currentQuestion];

    return (
      <Card className="w-full mb-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{question.question}</p>

          {currentSection === "quiz" && question.type === "spelling" ? (
            <div className="mb-4">
              <input
                type="text"
                value={spellingInput}
                onChange={(e) => setSpellingInput(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Type your answer here"
              />
              <Button
                className="mt-2"
                onClick={() => handleSpellingSubmit(question)}
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start text-left h-auto py-3"
                  onClick={() => handleAnswerSelect(option, question)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  // Format words data properly for WordList component
  const formatWordsForWordList = (examples) => {
    if (!examples || !Array.isArray(examples)) return [];

    // If examples are already in the right format, return them
    if (
      examples.length > 0 &&
      typeof examples[0] === "object" &&
      "word" in examples[0]
    ) {
      return examples;
    }

    // Otherwise, convert from [word, phonemes] format to {word, phonemes} format
    return examples.map(([word, phonemes]) => ({
      word,
      phonemes,
    }));
  };

  // Render feedback after answering
  const renderFeedback = () => {
    if (!showFeedback) return null;

    return (
      <div
        className={`p-4 rounded-md mb-4 ${
          currentFeedback.correct ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <div className="flex items-center">
          {currentFeedback.correct ? (
            <Check className="text-green-500 mr-2" />
          ) : (
            <X className="text-red-500 mr-2" />
          )}
          <p>{currentFeedback.message}</p>
        </div>
      </div>
    );
  };

  // Render the appropriate section based on current state
  const renderCurrentSection = () => {
    switch (currentSection) {
      case "wordList":
        return (
          <WordList
            words={words || []}
            consonantFocus={consonantFocus}
            onComplete={() => handleSectionComplete("wordList")}
          />
        );
      case "quiz":
        return (
          <>
            {renderFeedback()}
            {renderCurrentQuestion()}
          </>
        );
      case "story":
        return (
          <StorySection
            storyContent={testData.story || {}}
            consonantFocus={consonantFocus}
            onComplete={() => handleSectionComplete("story")}
          />
        );
      case "reading":
        return (
          <ReadingTest
            passages={testData.readingPassages || []}
            onComplete={(accuracy) =>
              handleSectionComplete("reading", { readingAccuracy: accuracy })
            }
          />
        );
      case "results":
        return (
          <ResultsSection
            results={results}
            consonantFocus={consonantFocus}
            onComplete={() => handleSectionComplete("results")}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className={cn("mt-8", className)} {...props}>
      <div className="grid grid-cols-4 gap-4 p-4">
        {phonemeCards.map((card, index) => {
          const randomColor = colors[index % colors.length];
          const randomColSpan = Math.random() > 0.5 ? 2 : 1;
          return (
            <PhonemeCardWithDrawer
              key={card.id || `${card.phoneme}`}
              card={card}
              randomColor={randomColor}
              randomColSpan={randomColSpan}
              activeSlides={activeSlides}
              onUnitTestStart={handleUnitTestStart}
            />
          );
        })}
      </div>
      {activeUnitTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 bg-background flex justify-center items-center">
            <ActivityTestContainer>
              <Progress
                value={(currentQuestion / quizQuestions.length) * 100}
                className="mb-2"
              />
              <h2 className="text-2xl font-bold mb-4">
                {activeUnitTest.title}
              </h2>
              <p className="text-gray-700 mb-6">{activeUnitTest.description}</p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Instructions</h3>
              </div>
              <WordList
                phoneme={activeUnitTest.phoneme}
                words={activeUnitTest.examples}
                onContinue={() => {
                  setQuizStarted(true);
                  setQuizCompleted(false);
                  setQuizResults(null);
                  handleUnitTestStart(activeUnitTest);
                }}
              />
              {quizStarted && !quizCompleted && renderCurrentSection()}
            </ActivityTestContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsonantLetters;
