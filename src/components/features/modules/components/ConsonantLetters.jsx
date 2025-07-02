// Main Component
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PhonemeCardWithDrawer from "./PhonemeCardWithDrawer";
import ConsonantUnitTest from "./ConsonantUnitTest";

import {
  fetchPhonemeCards,
  fetchPhonemeCardByPhoneme,
} from "../api/phonemicApi";

import { TestProvider } from "@/features/phonemicTest/context/TestContext";
import TestContainer from "@/features/phonemicTest/components/container/TestContainer";

import WordList from "@/features/phonemicTest/components/presentational/WordList";
import QuizSection from "@/features/phonemicTest/components/container/QuizSection";
import StorySection from "@/features/phonemicTest/components/presentational/StorySection";
import ReadingTest from "@/features/phonemicTest/components/presentational/ReadingTest";
import ResultsSection from "@/features/phonemicTest/components/presentational/ResultsSection";
import ReadingTestModule from "./readingTestModule";

/**
 * ConsonantSounds activity component
 *
 * @param {Object} props - Component props
 * @param {Object} props.activity - Activity data
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Rendered component
 */
function ConsonantLetters({ activity, className, ...props }) {
  const [phonemeCards, setPhonemeCards] = useState([]);
  const [activeSlides, setActiveSlides] = useState({});
  const [activeUnitTest, setActiveUnitTest] = useState(null);

  useEffect(() => {
    const loadPhonemeCards = async () => {
      const data = await fetchPhonemeCards();
      setPhonemeCards(data);
    };

    loadPhonemeCards();
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

  const handleUnitTestStart = (card) => {
    setActiveUnitTest(card);
  };

  const handleUnitTestClose = () => {
    setActiveUnitTest(null);
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
            <ReadingTestModule />
            <ConsonantUnitTest
              phoneme={activeUnitTest.phoneme}
              words={Object.entries(activeUnitTest.examples).map(
                ([word, phonemes]) => ({ word, phonemes })
              )}
              onClose={handleUnitTestClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsonantLetters;
