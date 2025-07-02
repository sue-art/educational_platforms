import { useEffect, useState } from "react";
import { useTestContext } from "../context/TestContext";

export const useAdaptiveLogic = () => {
  const { testData, answers, currentQuestionIndex } = useTestContext();

  const [adaptedQuestions, setAdaptedQuestions] = useState([]);
  const [shouldContinue, setShouldContinue] = useState(true);

  useEffect(() => {
    if (!testData || answers.length === 0) return;

    const {
      questions,
      adaptiveRules: {
        advancementThreshold,
        remediationThreshold,
        maximumQuestions,
        minimumQuestions,
      },
    } = testData;

    // Calculate current performance
    const answeredQuestions = answers.length;
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    const currentPerformance = (correctAnswers / answeredQuestions) * 100;

    // Determine if we should continue or end the test
    if (answeredQuestions >= minimumQuestions) {
      if (answeredQuestions >= maximumQuestions) {
        setShouldContinue(false);
      } else if (currentPerformance >= advancementThreshold) {
        // Student is doing well, potentially end early
        setShouldContinue(false);
      } else if (currentPerformance < remediationThreshold) {
        // Student needs more practice, adapt by providing more questions
        // of the types they're struggling with

        // Get question types the student is struggling with
        const strugglingTypes = answers
          .filter((a) => !a.isCorrect)
          .map((a) => {
            const question = questions.find(
              (q) => q.questionId === a.questionId
            );
            return question.questionType;
          })
          .reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {});

        // Find additional questions of those types
        const additionalQuestions = questions
          .filter(
            (q) =>
              strugglingTypes[q.questionType] &&
              !answers.some((a) => a.questionId === q.questionId)
          )
          .slice(0, 3); // Limit to 3 additional questions

        setAdaptedQuestions(additionalQuestions);
      }
    }
  }, [testData, answers, currentQuestionIndex]);

  return { adaptedQuestions, shouldContinue };
};
