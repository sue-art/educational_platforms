import React, { useState, useEffect } from "react";
import { usePhonics } from "../../context/PhonicsContext";
import { useStudent } from "../../../../../contexts/StudentContext";
import WordList from "../presentational/assessments/WordList.jsx";
import MatchingWords from "../presentational/assessments/MatchingWords";
import WordQuiz from "../presentational/assessments/WordQuiz";
import { Button } from "@/components/ui/button"; // Using shadcn Button
import PropTypes from "prop-types";

// Placeholder for a loading spinner or skeleton
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const AssessmentContainer = () => {
  const {
    currentLesson,
    assessmentType,
    currentAssessment, // Added from PhonicsContext state
    assessmentProgress,
    selectLesson, // Action to go back to lesson selection (within the same group)
    resetSelections, // Action to go back to lesson group selection
    submitAnswer,
    // error: phonicsError, // Potential error from context
    // loading: phonicsLoading // Potential loading from context
  } = usePhonics();

  const {
    student,
    updateProgress,
    loading: studentLoading,
    error: studentError,
  } = useStudent();

  const [questions, setQuestions] = useState([]);
  const [assessmentLoading, setAssessmentLoading] = useState(true); // Local loading for questions
  const [assessmentError, setAssessmentError] = useState(null); // Local error for questions

  useEffect(() => {
    // Ensure currentLesson and currentAssessment are available before fetching
    if (!currentLesson || !currentAssessment) {
      // This state should ideally be prevented by PhonicsPage logic
      setAssessmentLoading(false);
      setAssessmentError("Current lesson or assessment details are missing.");
      return;
    }

    const fetchQuestions = async () => {
      try {
        setAssessmentLoading(true);
        setAssessmentError(null);
        // Mock data - replace with actual API call based on currentLesson.id and currentAssessment.id or type
        // console.log(`Fetching questions for lesson ${currentLesson.id}, assessment ${currentAssessment.id} (${assessmentType})`);

        // Using placeholder questions based on totalQuestions from context
        const numQuestions =
          assessmentProgress.totalQuestions > 0
            ? assessmentProgress.totalQuestions
            : 10; // Fallback
        const questionsData = Array(numQuestions)
          .fill(null)
          .map((_, index) => ({
            id: `${currentAssessment.id}-${index + 1}`, // Unique question ID
            question: `Sample question ${index + 1} for ${assessmentType} "${
              currentLesson.name
            }"`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A", // This should come from your data source
          }));

        setQuestions(questionsData);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setAssessmentError(err.message || "Failed to fetch questions");
      } finally {
        setAssessmentLoading(false);
      }
    };

    fetchQuestions();
  }, [
    currentLesson,
    currentAssessment,
    assessmentType,
    assessmentProgress.totalQuestions,
  ]);

  const handleAnswer = (isCorrect) => {
    submitAnswer(isCorrect); // This will advance question index and complete assessment if last question
  };

  const handleBackToLessonDetail = () => {
    // This action should reset assessmentType, currentAssessment, assessmentProgress
    // but keep currentLesson selected.
    // The PhonicsContext's selectLesson action already does this.
    if (currentLesson) {
      selectLesson(currentLesson); // Reselect the current lesson to clear assessment state
    }
  };

  const handleAssessmentCompletedAndStudentProgressUpdate = () => {
    if (
      student &&
      currentLesson &&
      typeof assessmentProgress.score === "number"
    ) {
      updateProgress("phonics", currentLesson.id, assessmentProgress.score);
    }
  };

  // Effect to call updateProgress when assessment is marked completed in context
  useEffect(() => {
    if (assessmentProgress.completed) {
      handleAssessmentCompletedAndStudentProgressUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentProgress.completed]); // Only re-run if completion status changes

  if (studentLoading || assessmentLoading) return <LoadingSpinner />;
  if (studentError)
    return (
      <div className="text-destructive p-4">
        Error loading student data: {studentError}
      </div>
    );
  if (assessmentError)
    return (
      <div className="text-destructive p-4">
        Error loading assessment: {assessmentError}
      </div>
    );

  if (!currentLesson || !currentAssessment) {
    return (
      <div className="text-muted-foreground p-4">
        Assessment details are not available. Please select a lesson and
        assessment type.
      </div>
    );
  }

  if (assessmentProgress.completed) {
    return (
      <div className="assessment-completed text-center p-6 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Assessment Completed!
        </h2>
        {student && <p className="text-lg mb-2">Well done, {student.name}!</p>}
        <div className="score-display mb-6">
          <p className="text-xl">
            Your score:{" "}
            <span className="font-bold text-primary">
              {assessmentProgress.score}%
            </span>
          </p>
          <p className="text-muted-foreground">
            Correct answers: {assessmentProgress.correctAnswers} out of{" "}
            {assessmentProgress.totalQuestions}
          </p>
        </div>
        <div className="action-buttons space-x-4">
          <Button variant="outline" onClick={handleBackToLessonDetail}>
            Back to Lesson Details
          </Button>
          <Button variant="default" onClick={resetSelections}>
            Back to Lesson Groups
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[assessmentProgress.currentQuestionIndex];

  if (!currentQuestion) {
    if (
      assessmentProgress.totalQuestions > 0 &&
      assessmentProgress.currentQuestionIndex >=
        assessmentProgress.totalQuestions
    ) {
      // This case should be covered by assessmentProgress.completed, but as a fallback:
      return (
        <div className="text-muted-foreground p-4">
          Preparing results... If you see this for long, there might be an
          issue.
        </div>
      );
    }
    return <div className="text-muted-foreground p-4">Loading question...</div>;
  }

  const renderAssessmentTypeComponent = () => {
    const commonProps = {
      question: currentQuestion,
      onAnswer: handleAnswer, // handleAnswer expects (isCorrect)
      // The specific assessment components (WordList, etc.) will need to determine isCorrect
      // and call onAnswer with that boolean.
    };

    switch (assessmentType) {
      case "Word list":
        return <WordList {...commonProps} />;
      case "Matching words":
        return <MatchingWords {...commonProps} />;
      case "Word quiz":
        return <WordQuiz {...commonProps} />;
      default:
        return (
          <div className="text-destructive">
            Unknown assessment type: {assessmentType}
          </div>
        );
    }
  };

  return (
    <div className="assessment-container p-4 md:p-6 bg-card rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          {currentLesson.name} - {assessmentType}
        </h2>
        <Button variant="ghost" size="sm" onClick={handleBackToLessonDetail}>
          Cancel Assessment
        </Button>
      </div>

      <div className="progress-indicator text-sm text-muted-foreground mb-6">
        Question {assessmentProgress.currentQuestionIndex + 1} of{" "}
        {assessmentProgress.totalQuestions}
        <div className="w-full bg-muted rounded-full h-2.5 mt-1">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${
                (assessmentProgress.currentQuestionIndex /
                  assessmentProgress.totalQuestions) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {renderAssessmentTypeComponent()}
    </div>
  );
};

AssessmentContainer.propTypes = {
  // Props are derived from context, so not explicitly passed.
  // If this were to be more reusable, props would be defined here.
};

export default AssessmentContainer;
