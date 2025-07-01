import React from 'react';
import { usePhonics } from '../../context/PhonicsContext'; // Adjusted path
import { useStudent } from '../../../../../contexts/StudentContext'; // Adjusted path
import LessonCard from '../presentational/LessonCard';
import { Button } from '@/components/ui/button'; // Using shadcn Button

const LessonListContainer = () => {
  const { currentLessonGroup, selectLesson, resetSelections } = usePhonics();
  const { student, progress } = useStudent(); // Assuming student might be used later

  // Ensure progress and progress.phonics exist before trying to access deeper properties
  const completedLessons = progress?.phonics?.completedLessons || [];
  const lessonScores = progress?.phonics?.scores || {};

  if (!currentLessonGroup) {
    // This case should ideally be handled by PhonicsPage,
    // but returning null here is a safe fallback if rendered directly.
    return null;
  }

  return (
    <div className="lesson-list space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">
          {currentLessonGroup.name}
        </h2>
        <Button
          variant="outline"
          onClick={resetSelections}
        >
          Back to Lesson Groups
        </Button>
      </div>

      {student && (
         <p className="text-muted-foreground">
           Displaying lessons for {student.name}.
         </p>
      )}

      {(!currentLessonGroup.lessons || currentLessonGroup.lessons.length === 0) && (
        <p className="text-muted-foreground">No lessons available in this group.</p>
      )}

      <div className="lessons-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentLessonGroup.lessons && currentLessonGroup.lessons.map(lesson => {
          // Ensure lesson and lesson.id are valid
          if (!lesson || typeof lesson.id === 'undefined') {
            console.warn("Skipping invalid lesson object:", lesson);
            return null;
          }
          const isCompleted = completedLessons.includes(lesson.id);
          const score = lessonScores[lesson.id]; // Score can be undefined if not taken

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={isCompleted}
              score={score} // Pass score directly, LessonCard handles if it's undefined
              onClick={() => selectLesson(lesson)} // Pass the whole lesson object as per PhonicsContext
            />
          );
        })}
      </div>
    </div>
  );
};

export default LessonListContainer;
