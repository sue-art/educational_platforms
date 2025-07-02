import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import WordList from "@/features/phonemicTest/components/presentational/WordList";
import QuizSection from "@/features/phonemicTest/components/container/QuizSection";
import StorySection from "@/features/phonemicTest/components/presentational/StorySection";
import ReadingTest from "@/features/phonemicTest/components/presentational/ReadingTest";
import ResultsSection from "@/features/phonemicTest/components/presentational/ResultsSection";

/**
 * ConsonantUnitTest - A container component that manages the flow of a consonant-focused
 * phonemic test unit, coordinating various sub-components for a complete learning experience.
 *
 * @param {Object} props
 * @param {string} props.unitTitle - The title of the consonant unit test
 * @param {string} props.consonantFocus - The specific consonant being tested (e.g., "b", "ch", "d")
 * @param {Object} props.testData - Data containing words, quiz questions, story content, etc.
 * @param {Function} props.onComplete - Callback function when the test is completed
 * @param {boolean} props.showProgressIndicator - Whether to show progress through the test
 * @param {Array} props.words - List of words to be used in the word list section
 */
const ConsonantUnitTest = ({
  unitTitle = "Consonant Practice",
  consonantFocus,
  testData = {},
  onComplete = () => {},
  showProgressIndicator = true,
  words,
  onClose, // Add this prop to handle closing
}) => {
  // State to track current section and overall progress
  const [currentSection, setCurrentSection] = useState("wordList");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({
    quizScore: 0,
    readingAccuracy: 0,
    completedSections: [],
  });

  // Sections in order of completion
  const sections = ["wordList", "quiz", "story", "reading", "results"];

  // Update progress whenever the current section changes
  useEffect(() => {
    const currentIndex = sections.indexOf(currentSection);
    setProgress((currentIndex / (sections.length - 1)) * 100);
  }, [currentSection]);

  // Handle completion of a section
  const handleSectionComplete = (sectionName, sectionResults = {}) => {
    // Save section results
    setResults((prevResults) => ({
      ...prevResults,
      ...sectionResults,
      completedSections: [...prevResults.completedSections, sectionName],
    }));

    // Move to the next section
    const currentIndex = sections.indexOf(sectionName);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    } else {
      // If this was the last section, call the onComplete callback
      onComplete(results);
    }
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
          <QuizSection
            questions={testData.questions || []}
            onComplete={(score) =>
              handleSectionComplete("quiz", { quizScore: score })
            }
          />
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
    <div className="consonant-unit-test">
      <header className="unit-header">
        <h1>
          {unitTitle} {consonantFocus && `- "${consonantFocus}"`}
        </h1>

        {/* Add close button */}
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Close test"
        >
          &times;
        </button>

        {showProgressIndicator && (
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="progress-text">
              {Math.round(progress)}% complete
            </span>
          </div>
        )}
      </header>

      <main className="unit-content">{renderCurrentSection()}</main>
    </div>
  );
};

ConsonantUnitTest.propTypes = {
  unitTitle: PropTypes.string,
  consonantFocus: PropTypes.string,
  testData: PropTypes.shape({
    words: PropTypes.array,
    questions: PropTypes.array,
    story: PropTypes.object,
    readingPassages: PropTypes.array,
  }),
  onComplete: PropTypes.func,
  showProgressIndicator: PropTypes.bool,
};

export default ConsonantUnitTest;
