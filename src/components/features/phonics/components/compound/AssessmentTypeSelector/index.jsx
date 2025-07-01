import React from 'react';
import PropTypes from 'prop-types';
import { usePhonics } from '../../../context/PhonicsContext'; // Adjusted path
import AssessmentTypeButton from './AssessmentTypeButton';
import { cn } from '@/lib/utils';

const AssessmentTypeSelector = ({ lesson, className }) => {
  const { selectAssessmentType } = usePhonics();

  if (!lesson || !lesson.assessments || lesson.assessments.length === 0) {
    return (
      <div className={cn("assessment-selection p-4 text-center text-muted-foreground", className)}>
        <h2 className="text-xl font-semibold mb-3">Select Assessment Type</h2>
        <p>No assessments available for this lesson.</p>
      </div>
    );
  }

  return (
    <div className={cn("assessment-selection p-4 bg-card rounded-lg shadow", className)}>
      <h2 className="text-xl font-semibold mb-4 text-center text-foreground">
        Select Assessment for: <span className="text-primary">{lesson.name}</span>
      </h2>
      <ul className="space-y-3">
        {lesson.assessments.map(assessment => (
          <AssessmentTypeButton
            key={assessment.id}
            assessment={assessment}
            onClick={() => selectAssessmentType(assessment.type)} // Pass type string
          />
        ))}
      </ul>
    </div>
  );
};

AssessmentTypeSelector.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    assessments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        type: PropTypes.string.isRequired,
        questionCount: PropTypes.number // Optional: if you want to display this
      })
    ), // Allow assessments to be undefined or empty
  }).isRequired,
  className: PropTypes.string,
};

export default AssessmentTypeSelector;
