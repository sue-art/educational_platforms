import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useModules } from "@/components/features/modules/hooks/useModules";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { TestProvider } from "@/components/features/phonemicTest/context/TestContext";
import TestContainer from "@/components/features/phonemicTest/components/container/TestContainer";

function PhonemePage() {
  const { modules, isLoading, error, getAllModules } = useModules();
  useEffect(() => {
    getAllModules();
  }, [getAllModules]);

  // Example phonics categories
  const phonicsCategories = [
    {
      id: "phonemic-awareness",
      title: "Sounds & Letters",
      description: "Learn the sounds that individual letters make.",
      examples: ["a", "b", "c", "d"],
      level: "Beginner",
    },

    {
      id: "module-2",
      title: "Single Letter Sounds",
      description: "Learn the sounds that individual letters make.",
      examples: ["a", "b", "c", "d"],
      level: "Beginner",
    },
    {
      id: "module-3",
      title: "Blends",
      description: "Two or more consonants that make distinct sounds.",
      examples: ["sh", "ch", "th", "wh"],
      level: "Intermediate",
    },
    {
      id: "module-4",
      title: "Digraphs",
      description: "Two letters that make a single sound.",
      examples: ["bl", "cr", "st", "pl"],
      level: "Intermediate",
    },
    {
      id: "module-5",
      title: "Long Vowel Sounds",
      description: "Vowels that say their name.",
      examples: ["a_e", "ee", "i_e", "oa"],
      level: "Advanced",
    },
    {
      id: "module-6",
      title: "Syllables",
      description:
        "Teaching the 6 phonetic patterns of English and their corresponding syllable types.",
      examples: ["a", "b", "c", "d"],
      level: "Advanced",
    },
  ];
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Phonics Learning</h1>
        <p className="text-gray-700 mb-8">
          Phonics is a method of teaching people to read by correlating sounds
          with letters or groups of letters. Our phonics program is designed to
          help students develop strong reading and writing skills through a
          structured approach to learning letter-sound relationships.
        </p>

        <TestProvider>
          <TestContainer testId="consonant-unit-test-001" />
        </TestProvider>
        {isLoading && <p className="text-center py-8">Loading modules...</p>}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}
        {!isLoading && modules.length > 0 && (
          <section className="text-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phonicsCategories.map((category) => (
                <div
                  key={category.id}
                  className="border bg-amber-200 text-white rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {category.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm text-left mb-4">
                    {category.description}
                  </p>

                  <div className="flex gap-2 mb-4">
                    {category.examples.map((example, index) => (
                      <span
                        key={index}
                        className="bg-white text-blue-800 px-3 py-1 rounded-full font-small"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/phonics/${category.id}`}
                    className={cn(
                      "relative whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    )}
                  >
                    <button className="absolute bottom right text-grey-600 hover:underline">
                      Start Lessons →
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
        {!isLoading && modules.length === 0 && !error && (
          <p className="text-center py-8">No modules found.</p>
        )}
      </div>
    </>
  );
}

export default PhonemePage;
