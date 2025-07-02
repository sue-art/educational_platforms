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
