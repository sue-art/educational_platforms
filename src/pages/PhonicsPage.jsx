import React from 'react';
import { usePhonics } from '../components/features/phonics/context/PhonicsContext'; // Adjusted path
import { useStudent } from '../contexts/StudentContext'; // Correct global path
import LessonGroupsContainer from '../components/features/phonics/components/container/LessonGroupsContainer';
import LessonListContainer from '../components/features/phonics/components/container/LessonListContainer';
import AssessmentContainer from '../components/features/phonics/components/container/AssessmentContainer';
import AssessmentTypeSelector from '../components/features/phonics/components/compound/AssessmentTypeSelector'; // Added import
import PageLayout from '../components/common/layout/PageLayout';

const PhonicsPage = () => {
  const {
    currentLessonGroup,
    currentLesson,
    assessmentType, // This is the selected assessment *type* (e.g., "Word list")
    // currentAssessment, // This is the *object* for the selected assessment
    loading: phonicsLoading, // Renamed to avoid conflict
    error: phonicsError // Renamed to avoid conflict
  } = usePhonics();

  const { student, loading: studentLoading, error: studentError } = useStudent();

  if (phonicsLoading || studentLoading) {
    return <PageLayout><div className="text-center p-10">Loading...</div></PageLayout>;
  }

  // Consolidate error display
  const error = phonicsError || studentError;
  if (error) {
    return <PageLayout><div className="text-center p-10 text-destructive">Error: {error}</div></PageLayout>;
  }

  const renderContent = () => {
    if (!currentLessonGroup) {
      return <LessonGroupsContainer />;
    }

    if (!currentLesson) {
      // currentLessonGroup is selected, but no specific lesson yet
      return <LessonListContainer />;
    }

    // currentLesson is selected
    if (assessmentType) {
      // An assessmentType (e.g., "Word list", "Matching words") has been selected for the currentLesson
      return <AssessmentContainer />;
    }

    // currentLesson is selected, but no assessmentType chosen yet. Show selector.
    return (
      <AssessmentTypeSelector
        lesson={currentLesson}
        // Example of how to pass className if AssessmentTypeSelector accepts it
        // className="mt-8 max-w-md mx-auto"
      />
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="mb-6 pb-4 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground">Phonics Practice</h1>
          {student && <p className="text-lg text-muted-foreground">Welcome back, {student.name}!</p>}
        </div>
        {renderContent()}
      </div>
    </PageLayout>
  );
};

export default PhonicsPage;
