import { useMemo } from "react";
import { useTestContext } from "../context/TestContext";

export const useScoring = () => {
  const { testData, answers, hintsUsed, score } = useTestContext();

  const scoreDetails = useMemo(() => {
    if (!testData) return null;

    const { scoring } = testData;
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentageScore =
      totalQuestions > 0
        ? (score / (totalQuestions * scoring.pointsPerQuestion)) * 100
        : 0;

    const passed = percentageScore >= scoring.passingScore;

    // Group performance by question type
    const performanceByType = answers.reduce((acc, answer) => {
      const question = testData.questions.find(
        (q) => q.questionId === answer.questionId
      );
      if (!question) return acc;

      const type = question.questionType;
      if (!acc[type]) {
        acc[type] = { correct: 0, total: 0 };
      }

      acc[type].total += 1;
      if (answer.isCorrect) {
        acc[type].correct += 1;
      }

      return acc;
    }, {});

    // Calculate percentage for each type
    Object.keys(performanceByType).forEach((type) => {
      const { correct, total } = performanceByType[type];
      performanceByType[type].percentage = (correct / total) * 100;
    });

    return {
      rawScore: score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      hintsUsed: hintsUsed.length,
      percentageScore,
      passed,
      performanceByType,
    };
  }, [testData, answers, hintsUsed, score]);

  return scoreDetails;
};
