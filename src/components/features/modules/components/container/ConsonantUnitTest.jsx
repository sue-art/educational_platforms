import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const ConsonantUnitTest = ({ phoneme, words, onClose }) => {
  // State for the current test phase
  const [testPhase, setTestPhase] = useState("wordList"); // wordList, quiz, story, reading, results
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [storyText, setStoryText] = useState("");
  const [readingQuestions, setReadingQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({
    correct: false,
    message: "",
  });

  // Initialize the test when the component mounts
  useEffect(() => {
    if (words && words.length) {
      // Generate quiz questions based on the words
      generateQuizQuestions(words);
      // Generate a story using the words
      generateStory(words, phoneme);
      // Generate reading comprehension questions
      generateReadingQuestions(words);
    }
  }, [words, phoneme]);

  const logQuestionResult = async (question, answer, isCorrect) => {
    await fetch("/api/log-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: question.id || question.question,
        phoneme,
        userAnswer: answer,
        isCorrect,
        userId: user.id, // Assuming user ID is available
      }),
    });
  };

  const logPhonemePractice = async (phoneme) => {
    await fetch("/api/log-phoneme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneme, userId: user.id }), // Assuming user ID is available
    });
  };

  // Call this function in the `generateQuizQuestions` or when the phoneme is practiced
  useEffect(() => {
    logPhonemePractice(phoneme);
  }, [phoneme]);

  const handleAnswerSelect = (answer, question) => {
    let isCorrect = false;
    let feedbackMsg = "";

    if (question.type === "identify") {
      isCorrect =
        JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
      feedbackMsg = isCorrect
        ? "Correct! You identified the right letters."
        : `Not quite. The ${phoneme} sound in "${
            question.word
          }" comes from ${question.correctAnswer.join(", ")}.`;
    } else if (question.type === "spelling") {
      isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
      feedbackMsg = isCorrect
        ? "Perfect spelling!"
        : `The correct spelling is "${question.correctAnswer}".`;
    } else {
      isCorrect = answer === question.correctAnswer;
      feedbackMsg = isCorrect
        ? "Correct! Great reading comprehension."
        : `The correct answer was "${question.correctAnswer}".`;
    }

    // Log the result
    logQuestionResult(question, answer, isCorrect);

    // Update score and feedback
    if (isCorrect) setScore((prev) => prev + 1);
    setCurrentFeedback({ correct: isCorrect, message: feedbackMsg });
    setShowFeedback(true);

    // Move to the next question
    setTimeout(() => {
      setShowFeedback(false);
      if (testPhase === "quiz" && currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (testPhase === "quiz") {
        setTestPhase("story");
        setCurrentQuestion(0);
      } else if (
        testPhase === "reading" &&
        currentQuestion < readingQuestions.length - 1
      ) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (testPhase === "reading") {
        setTestPhase("results");
      }
    }, 2000);
  };

  // Generate quiz questions from the word list
  const generateQuizQuestions = (wordList) => {
    const questions = wordList.map((word) => {
      // Create phoneme identification questions
      return {
        type: "identify",
        question: `Which letter(s) make the ${phoneme} sound in "${word.word}"?`,
        word: word.word,
        correctAnswer: word.phonemes.filter((p) =>
          p.includes(phoneme.replace(/\//g, ""))
        ),
        options: word.phonemes,
      };
    });

    // Add some spelling questions
    const spellingQuestions = wordList.slice(0, 3).map((word) => ({
      type: "spelling",
      question: `Spell the word that means: "${getWordDefinition(word.word)}"`,
      word: word.word,
      correctAnswer: word.word,
      options: [],
    }));

    // Combine and shuffle questions
    const allQuestions = [...questions, ...spellingQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuizQuestions(allQuestions);
    setTotalQuestions(allQuestions.length);
  };

  // Generate a simple story using the words
  const generateStory = (wordList, phonemeSound) => {
    const wordsToUse = wordList.map((w) => w.word);
    const story = `
      One day, ${wordsToUse[0] || "someone"} was walking to the ${
      wordsToUse[1] || "place"
    }.
      On the way, they saw a ${
        wordsToUse[2] || "thing"
      } that made them stop and look.
      "What a ${wordsToUse[3] || "surprise"}!" they said with excitement.
      
      The ${phonemeSound} sound could be heard all around as they continued their journey.
      They found a ${wordsToUse[4] || "object"} and decided to ${
      wordsToUse[5] || "action"
    } with it.
      
      By the end of the day, they learned that the ${phonemeSound} sound is very important
      in words like ${wordsToUse.join(", ")}.
    `;
    setStoryText(story);
  };

  // Generate reading comprehension questions
  const generateReadingQuestions = (wordList) => {
    const questions = [
      {
        question: `Which word with the ${phoneme} sound was found during the journey?`,
        options: wordList.map((w) => w.word).slice(0, 4),
        correctAnswer: wordList[4]?.word || wordList[0]?.word,
      },
      {
        question:
          "What was the main character doing at the beginning of the story?",
        options: ["Running", "Walking", "Swimming", "Jumping"],
        correctAnswer: "Walking",
      },
      {
        question:
          "How did the character feel when they saw something on their way?",
        options: ["Sad", "Angry", "Excited", "Tired"],
        correctAnswer: "Excited",
      },
    ];
    setReadingQuestions(questions);
  };

  // Mock function to get word definitions (in a real app, you'd use a dictionary API)
  const getWordDefinition = (word) => {
    const definitions = {
      ball: "A round object that is used in games",
      bubble: "A thin sphere of liquid enclosing air or gas",
      ribbon: "A long, narrow strip of fabric used for decoration",
      chin: "The protruding part of the face below the mouth",
      dog: "A domesticated carnivorous mammal",
      // Add more as needed
    };
    return definitions[word] || `A type of ${word}`;
  };

  // Handle answer selection
  const handleAnswerSelectold = (answer, question) => {
    let isCorrect = false;
    let feedbackMsg = "";

    if (question.type === "identify") {
      isCorrect =
        JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
      feedbackMsg = isCorrect
        ? "Correct! You identified the right letters."
        : `Not quite. The ${phoneme} sound in "${
            question.word
          }" comes from ${question.correctAnswer.join(", ")}.`;
    } else if (question.type === "spelling") {
      isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
      feedbackMsg = isCorrect
        ? "Perfect spelling!"
        : `The correct spelling is "${question.correctAnswer}".`;
    } else {
      isCorrect = answer === question.correctAnswer;
      feedbackMsg = isCorrect
        ? "Correct! Great reading comprehension."
        : `The correct answer was "${question.correctAnswer}".`;
    }

    // Update score
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Store user's answer
    setUserAnswers((prev) => [
      ...prev,
      { question, userAnswer: answer, correct: isCorrect },
    ]);

    // Show feedback
    setCurrentFeedback({ correct: isCorrect, message: feedbackMsg });
    setShowFeedback(true);

    // After a delay, move to the next question or phase
    setTimeout(() => {
      setShowFeedback(false);
      if (testPhase === "quiz" && currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (testPhase === "quiz") {
        setTestPhase("story");
        setCurrentQuestion(0);
      } else if (
        testPhase === "reading" &&
        currentQuestion < readingQuestions.length - 1
      ) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (testPhase === "reading") {
        setTestPhase("results");
      }
    }, 2000);
  };

  // Handle text input for spelling questions
  const [spellingInput, setSpellingInput] = useState("");

  const handleSpellingSubmit = (question) => {
    handleAnswerSelect(spellingInput, question);
    setSpellingInput("");
  };

  // Start the quiz
  const startQuiz = () => {
    setTestPhase("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
  };

  // Start the reading test
  const startReadingTest = () => {
    setTestPhase("reading");
    setCurrentQuestion(0);
  };

  // Restart the entire test
  const restartTest = () => {
    setTestPhase("wordList");
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
  };

  // Render the current question
  const renderCurrentQuestion = () => {
    const questions = testPhase === "quiz" ? quizQuestions : readingQuestions;
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

          {testPhase === "quiz" && question.type === "spelling" ? (
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

  // Render the word list
  const renderWordList = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">Words with the {phoneme} Sound</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {words.map((word, idx) => (
          <Card key={idx} className="bg-amber-100">
            <CardContent className="p-4">
              <p className="text-lg font-medium">{word.word}</p>
              <p className="text-sm text-gray-600">
                {word.phonemes.map((p, i) => (
                  <span
                    key={i}
                    className={
                      p.includes(phoneme.replace(/\//g, ""))
                        ? "font-bold text-amber-600"
                        : ""
                    }
                  >
                    {p}
                  </span>
                ))}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={startQuiz} className="w-full bg-amber-300 text-white">
        Start Unit Test
      </Button>
    </div>
  );

  // Render the story
  const renderStory = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">Read the Story</h3>
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="whitespace-pre-line">{storyText}</p>
        </CardContent>
      </Card>
      <Button onClick={startReadingTest} className="w-full">
        Continue to Reading Questions
      </Button>
    </div>
  );

  // Render the results
  const renderResults = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">Test Results</h3>
      <Card className="mb-6">
        <CardContent className="p-4 text-center">
          <p className="text-3xl font-bold mb-2">
            {score} / {totalQuestions + readingQuestions.length}
          </p>
          <Progress
            value={(score / (totalQuestions + readingQuestions.length)) * 100}
            className="mb-4"
          />
          <p className="text-lg">
            {score === totalQuestions + readingQuestions.length
              ? "Perfect score! Excellent work!"
              : score > (totalQuestions + readingQuestions.length) / 2
              ? "Good job! Keep practicing to improve."
              : "Keep practicing! You'll get better with time."}
          </p>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button onClick={restartTest} className="flex-1">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Button onClick={onClose} variant="outline" className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
      </div>
    </div>
  );

  // Main render method
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link onClick={onClose} className="text-blue-500 hover:underline">
          Back to Phonics Learning
        </Link>
      </div>
      <h2 className="text-2xl items-center font-bold mb-5">
        Consonant Phoneme Practice
      </h2>

      {testPhase === "wordList" && renderWordList()}
      {testPhase === "quiz" && (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Phoneme Quiz</p>
            <Progress
              value={(currentQuestion / quizQuestions.length) * 100}
              className="mb-2"
            />
          </div>
          {renderFeedback()}
          {renderCurrentQuestion()}
        </>
      )}
      {testPhase === "story" && renderStory()}
      {testPhase === "reading" && (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Reading Comprehension</p>
            <Progress
              value={(currentQuestion / readingQuestions.length) * 100}
              className="mb-2"
            />
          </div>
          {renderFeedback()}
          {renderCurrentQuestion()}
        </>
      )}
      {testPhase === "results" && renderResults()}
    </div>
  );
};

export default ConsonantUnitTest;
