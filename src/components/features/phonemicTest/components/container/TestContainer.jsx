import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTestContext } from "../../context/TestContext";
import { useAdaptiveLogic } from "../../hooks/useAdaptiveLogic";
import { useScoring } from "../../hooks/useScoring";
import QuestionContainer from "./QuestionContainer";
import TestLayout from "../layout/TestLayout";
import ProgressIndicator from "../presentational/ProgressIndicator";

const TestContainer = ({ testId }) => {
  const {
    testData,
    loading,
    error,
    currentQuestionIndex,
    testCompleted,
    loadTest,
    resetTest,
  } = useTestContext();

  const { adaptedQuestions, shouldContinue } = useAdaptiveLogic();
  const scoreDetails = useScoring();

  // Load test data when component mounts
  useEffect(() => {
    loadTest(testId);
  }, []);

  if (loading) {
    return <div className="loading">Loading test...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading test: {error}</p>
        <button onClick={() => loadTest(testId)}>Retry</button>
      </div>
    );
  }

  if (!testData) {
    return <div className="no-data">No test data available</div>;
  }

  // Show test results when completed
  if (testCompleted) {
    return (
      <div className="test-results">
        <h2>Test Completed!</h2>

        <div className="score-summary">
          <p className="final-score">
            Your score: {scoreDetails.percentageScore.toFixed(1)}%
          </p>

          <p className="pass-status">
            {scoreDetails.passed ? "Passed! 🎉" : "Keep practicing!"}
          </p>

          <div className="score-details">
            <p>
              Correct answers: {scoreDetails.correctAnswers} out of{" "}
              {scoreDetails.totalQuestions}
            </p>
            <p>Hints used: {scoreDetails.hintsUsed}</p>
          </div>
        </div>

        <h3>Performance by Skill</h3>
        <div className="performance-by-type">
          {Object.entries(scoreDetails.performanceByType).map(
            ([type, data]) => (
              <div key={type} className="skill-performance">
                <h4>{type}</h4>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                <p>
                  {data.percentage.toFixed(0)}% ({data.correct}/{data.total})
                </p>
              </div>
            )
          )}
        </div>

        <button className="restart-button" onClick={resetTest}>
          Try Again
        </button>
      </div>
    );
  }

  // Get current question to display
  const allQuestions = [...testData.questions, ...adaptedQuestions];
  const currentQuestion = allQuestions[currentQuestionIndex];

  // Calculate progress
  const progress = {
    current: currentQuestionIndex + 1,
    total: shouldContinue ? allQuestions.length : currentQuestionIndex + 1,
    percentage:
      ((currentQuestionIndex + 1) /
        (shouldContinue ? allQuestions.length : currentQuestionIndex + 1)) *
      100,
  };

  return (
    <TestLayout
      title={`${testData.testId} - ${testData.skillsAssessed.join(", ")}`}
      progress={
        <ProgressIndicator
          current={progress.current}
          total={progress.total}
          percentage={progress.percentage}
        />
      }
    >
      <QuestionContainer question={currentQuestion} />
    </TestLayout>
  );
};

TestContainer.propTypes = {
  testId: PropTypes.string.isRequired,
};

export default TestContainer;
