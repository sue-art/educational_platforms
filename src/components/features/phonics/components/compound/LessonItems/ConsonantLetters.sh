# CLI Script for Creating ConsonantLetters Component Structure

Here's a bash script that will create all the necessary files and directories for your ConsonantLetters component structure:

```bash
#!/bin/bash

# Base directory for the component
BASE_DIR="ConsonantLetters"

# Create main directory structure
mkdir -p $BASE_DIR/components/ActivityTest
mkdir -p $BASE_DIR/components/shared
mkdir -p $BASE_DIR/hooks

# Create main component file
cat > $BASE_DIR/index.jsx << 'EOF'
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
EOF

# Create ConsonantLettersRoot component
cat > $BASE_DIR/components/ConsonantLettersRoot.jsx << 'EOF'
import React from "react";
import { cn } from "@/lib/utils";

export const ConsonantLettersRoot = ({ children, className, ...props }) => {
  return (
    <div className={cn("mt-8", className)} {...props}>
      {children}
    </div>
  );
};
EOF

# Create PhonemeGrid component
cat > $BASE_DIR/components/PhonemeGrid.jsx << 'EOF'
import React from "react";
import PhonemeCardWithDrawer from "../presentational/PhonemeCardWithDrawer";

export const PhonemeGrid = ({ 
  phonemeCards, 
  activeSlides, 
  onUnitTestStart 
}) => {
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

  return (
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
            onUnitTestStart={() => onUnitTestStart(card)}
          />
        );
      })}
    </div>
  );
};
EOF

# Create ActivityTestModal component
cat > $BASE_DIR/components/ActivityTest/ActivityTestModal.jsx << 'EOF'
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
EOF

# Create WordListSection component
cat > $BASE_DIR/components/ActivityTest/WordListSection.jsx << 'EOF'
import React from "react";
import WordList from "../../presentational/WordList";

export const WordListSection = ({ phoneme, words, onContinue }) => {
  return (
    <WordList
      phoneme={phoneme}
      words={words}
      onContinue={onContinue}
    />
  );
};
EOF

# Create QuizSection component
cat > $BASE_DIR/components/ActivityTest/QuizSection.jsx << 'EOF'
import React from "react";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const QuizSection = ({ 
  currentSection, 
  quizQuestions, 
  currentQuestion,
  showFeedback,
  currentFeedback,
  onAnswerSelect
}) => {
  if (!quizQuestions || quizQuestions.length === 0 || currentQuestion >= quizQuestions.length) {
    return <div>No questions available</div>;
  }

  const question = quizQuestions[currentQuestion];

  return (
    <>
      {showFeedback && <FeedbackDisplay feedback={currentFeedback} />}
      
      <Card className="w-full mb-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{question.question}</p>

          <div className="grid grid-cols-1 gap-2">
            {question.options.map((option, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="justify-start text-left h-auto py-3"
                onClick={() => onAnswerSelect(option, question)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
EOF

# Create ProgressIndicator component
cat > $BASE_DIR/components/ActivityTest/ProgressIndicator.jsx << 'EOF'
import React from "react";
import { Progress } from "@/components/ui/progress";

export const ProgressIndicator = ({ value }) => {
  return <Progress value={value} className="mb-2" />;
};
EOF

# Create FeedbackDisplay component
cat > $BASE_DIR/components/ActivityTest/FeedbackDisplay.jsx << 'EOF'
import React from "react";
import { Check, X } from "lucide-react";

export const FeedbackDisplay = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div
      className={`p-4 rounded-md mb-4 ${
        feedback.correct ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex items-center">
        {feedback.correct ? (
          <Check className="text-green-500 mr-2" />
        ) : (
          <X className="text-red-500 mr-2" />
        )}
        <p>{feedback.message}</p>
      </div>
    </div>
  );
};
EOF

# Create ProgressBar shared component
cat > $BASE_DIR/components/shared/ProgressBar.jsx << 'EOF'
import React from "react";

export const ProgressBar = ({ value, max, className }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
EOF

# Create usePhonemeCards hook
cat > $BASE_DIR/hooks/usePhonemeCards.jsx << 'EOF'
import { useState, useEffect } from "react";
import { fetchPhonemeCards } from "../../api/phonemicApi";

export const usePhonemeCards = () => {
  const [phonemeCards, setPhonemeCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhonemeCards = async () => {
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
    
    loadPhonemeCards();
  }, []);

  return { phonemeCards, isLoading, error };
};
EOF

# Create useQuizState hook
cat > $BASE_DIR/hooks/useQuizState.jsx << 'EOF'
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
EOF

echo "ConsonantLetters component structure created successfully!"
```

## Node.js Version

If you prefer using Node.js instead of bash, here's a JavaScript version of the script:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Base directory for the component
const BASE_DIR = "ConsonantLetters";

// Function to create directory if it doesn't exist
function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to create file with content
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created file: ${filePath}`);
}

// Create directory structure
createDirectoryIfNotExists(path.join(BASE_DIR, 'components/ActivityTest'));
createDirectoryIfNotExists(path.join(BASE_DIR, 'components/shared'));
createDirectoryIfNotExists(path.join(BASE_DIR, 'hooks'));

// Create main component file
createFile(path.join(BASE_DIR, 'index.jsx'), `import React from "react";
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

export default ConsonantLetters;`);

// Create ConsonantLettersRoot component
createFile(path.join(BASE_DIR, 'components/ConsonantLettersRoot.jsx'), `import React from "react";
import { cn } from "@/lib/utils";

export const ConsonantLettersRoot = ({ children, className, ...props }) => {
  return (
    <div className={cn("mt-8", className)} {...props}>
      {children}
    </div>
  );
};`);

// Create PhonemeGrid component
createFile(path.join(BASE_DIR, 'components/PhonemeGrid.jsx'), `import React from "react";
import PhonemeCardWithDrawer from "../presentational/PhonemeCardWithDrawer";

export const PhonemeGrid = ({ 
  phonemeCards, 
  activeSlides, 
  onUnitTestStart 
}) => {
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

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {phonemeCards.map((card, index) => {
        const randomColor = colors[index % colors.length];
        const randomColSpan = Math.random() > 0.5 ? 2 : 1;
        
        return (
          <PhonemeCardWithDrawer
            key={card.id || \`\${card.phoneme}\`}
            card={card}
            randomColor={randomColor}
            randomColSpan={randomColSpan}
            activeSlides={activeSlides}
            onUnitTestStart={() => onUnitTestStart(card)}
          />
        );
      })}
    </div>
  );
};`);

// Create ActivityTestModal component
createFile(path.join(BASE_DIR, 'components/ActivityTest/ActivityTestModal.jsx'), `import React from "react";
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
};`);

// Create WordListSection component
createFile(path.join(BASE_DIR, 'components/ActivityTest/WordListSection.jsx'), `import React from "react";
import WordList from "../../presentational/WordList";

export const WordListSection = ({ phoneme, words, onContinue }) => {
  return (
    <WordList
      phoneme={phoneme}
      words={words}
      onContinue={onContinue}
    />
  );
};`);

// Create QuizSection component
createFile(path.join(BASE_DIR, 'components/ActivityTest/QuizSection.jsx'), `import React from "react";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const QuizSection = ({ 
  currentSection, 
  quizQuestions, 
  currentQuestion,
  showFeedback,
  currentFeedback,
  onAnswerSelect
}) => {
  if (!quizQuestions || quizQuestions.length === 0 || currentQuestion >= quizQuestions.length) {
    return <div>No questions available</div>;
  }

  const question = quizQuestions[currentQuestion];

  return (
    <>
      {showFeedback && <FeedbackDisplay feedback={currentFeedback} />}
      
      <Card className="w-full mb-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{question.question}</p>

          <div className="grid grid-cols-1 gap-2">
            {question.options.map((option, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="justify-start text-left h-auto py-3"
                onClick={() => onAnswerSelect(option, question)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};`);

// Create ProgressIndicator component
createFile(path.join(BASE_DIR, 'components/ActivityTest/ProgressIndicator.jsx'), `import React from "react";
import { Progress } from "@/components/ui/progress";

export const ProgressIndicator = ({ value }) => {
  return <Progress value={value} className="mb-2" />;
};`);

// Create FeedbackDisplay component
createFile(path.join(BASE_DIR, 'components/ActivityTest/FeedbackDisplay.jsx'), `import React from "react";
import { Check, X } from "lucide-react";

export const FeedbackDisplay = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div
      className={\`p-4 rounded-md mb-4 \${
        feedback.correct ? "bg-green-100" : "bg-red-100"
      }\`}
    >
      <div className="flex items-center">
        {feedback.correct ? (
          <Check className="text-green-500 mr-2" />
        ) : (
          <X className="text-red-500 mr-2" />
        )}
        <p>{feedback.message}</p>
      </div>
    </div>
  );
};`);

// Create ProgressBar shared component
createFile(path.join(BASE_DIR, 'components/shared/ProgressBar.jsx'), `import React from "react";

export const ProgressBar = ({ value, max, className }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={\`w-full bg-gray-200 rounded-full h-2.5 \${className}\`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: \`\${percentage}%\` }}
      ></div>
    </div>
  );
};`);

// Create usePhonemeCards hook
createFile(path.join(BASE_DIR, 'hooks/usePhonemeCards.jsx'), `import { useState, useEffect } from "react";
import { fetchPhonemeCards } from "../../api/phonemicApi";

export const usePhonemeCards = () => {
  const [phonemeCards, setPhonemeCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhonemeCards = async () => {
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
    
    loadPhonemeCards();
  }, []);

  return { phonemeCards, isLoading, error };
};`);

// Create useQuizState hook
createFile(path.join(BASE_DIR, 'hooks/useQuizState.jsx'), `import { useState } from "react";
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
      message: isCorrect ? "Correct!" : \`Incorrect. The correct answer is \${question.answer}.\`,
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
};`);

console.log("ConsonantLetters component structure created successfully!");
