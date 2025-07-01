import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button'; // Using shadcn Button
import { cn } from '@/lib/utils';

const AssessmentTypeButton = ({ assessment, onClick, className }) => {
  return (
    <li className={cn(className)}>
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full justify-start py-6 text-left" // Make button full width
      >
        <div className="flex flex-col">
          <span className="text-md font-semibold">{assessment.type}</span>
          {assessment.questionCount && (
            <span className="text-xs text-muted-foreground">
              {assessment.questionCount} questions
            </span>
          )}
        </div>
      </Button>
    </li>
  );
};

AssessmentTypeButton.propTypes = {
  assessment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    questionCount: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AssessmentTypeButton;
