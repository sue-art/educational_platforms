import React, { useEffect } from "react";
import PageLayout from "../components/common/layout/PageLayout";
import { cn } from "../lib/utils";

import { Button } from "@/components/ui/button"; // shadcn Button
import { BackgroundWithFixedImages } from "../components/motion/KnowledgeThreadsBackground";

import { Link } from "react-router-dom";

import useModules from "../components/features/module/useModules";

const HomePage = () => {
  // Example phonics categories
  const { modules, isLoading, error, getAllModules } = useModules();
  useEffect(() => {
    getAllModules();
  }, [getAllModules]);

  const buttonVariants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const buttonSize = {
    default: "h-10 px-4 py-2",
  };

  // Example course data
  const course = {
    id: "course-123",
    title: "Early Reading Skills",
    description:
      "A comprehensive course to develop early reading skills for ages 4-6",
    thumbnail: "/images/courses/early-reading.jpg",
    level: "Beginner",
    ageRange: "4-6",
    duration: "8 weeks",
    modules: [
      {
        id: "phonemic-awareness",
        title: "Phonics Learning",
        order: 1,
        description:
          "Focuses on the sounds of individual letters and how they combine to form words.",
        activities: ["activity-101", "activity-102", "activity-103"],
      },
      {
        id: "module-2",
        title: "Letter Sounds and Blends",
        order: 2,
        description:
          "Students learn the sounds that different letters make, starting with simple consonants and vowels.",
        activities: ["activity-201", "activity-202"],
      },
      {
        id: "module-3",
        title: "Progress Tracking",
        order: 3,
        description:
          "Monitor learning with detailed progress reports and achievements.",
        activities: ["activity-301", "activity-302", "activity-303"],
      },
      {
        id: "module-4",
        title: "Syllables",
        order: 4,
        description:
          "Teaching the 6 phonetic patterns of English and their corresponding syllable types is the solution. https://readingrev.com/blog/big-kids-need-phonics-too-series-step-3-teach-syllables",
        activities: ["activity-401", "activity-402"],
      },
      {
        id: "module-5",
        title: "Reading Practice",
        order: 5,
        description:
          "Covers different ways to spell the same sounds, expanding vocabulary.",
        activities: ["activity-501", "activity-502"],
      },
      {
        id: "module-6",
        title: "Advanced Phonic Knowledge",
        order: 6,
        description:
          "Explores complex sound patterns and spelling rules, preparing students for advanced reading materials.",
        activities: ["activity-601", "activity-602"],
      },
    ],
  };

  const phonicsCategories = [
    {
      id: "phonemic-awareness",
      title: "Consonant Letter Sounds",
      description: "Learn the sounds that individual letters make.",
      examples: ["a", "b", "c", "d"],
      level: "Beginner",
    },

    {
      id: "module-2",
      title: "Vowel Letter Sounds",
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
    <PageLayout>
      <div className="container mx-auto p-4">
        <BackgroundWithFixedImages>
          {/* Welcome Section */}
          <section className="text-center pb-20">
            <h1 className="text-4xl text-emerald-300 font-bold mt-20">
              Learn to Read with Confidence
            </h1>
            <p className="text-md text-muted-foreground">
              A fun and interactive way for children to learn phonics and
              reading skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
              <Link
                to="/phonics/phonemic-awareness"
                className="bg-emerald-300 text-white px-6 py-3 rounded-md font-small hover:bg-emerald-500"
              >
                Learn Phonics
              </Link>
              <Link
                to="/reading"
                className=" bg-amber-200 text-white  px-6 py-3 rounded-md font-medium hover:bg-amber-400"
              >
                Start Reading
              </Link>
            </div>
          </section>
        </BackgroundWithFixedImages>
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

        <section className="text-center my-8">
          <h1 className="text-4xl text-emerald-300 font-bold mt-30 mb-6">
            Sounds of the Week
          </h1>
          <p className="text-lg text-muted-foreground">
            i, igh, y, ie, i-e, y-e, i-e
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-5 mb-20 justify-center">
            <Link
              to="/phonics/phonemic-awareness"
              className="bg-emerald-300 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-500"
            >
              Practice words
            </Link>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center my-8 py-8 bg-secondary/50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join us today and unlock a world of knowledge and fun!
          </p>
          <Link
            to="/login"
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              buttonVariants.default,
              buttonSize.default
            )}
          >
            Assesment{" "}
          </Link>
        </section>
      </div>
    </PageLayout>
  );
};

export default HomePage;
