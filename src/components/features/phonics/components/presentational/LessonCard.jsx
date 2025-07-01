import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils'; // Using shadcn's cn utility

const LessonCard = ({
  lesson,
  isCompleted,
  score,
  onClick,
  className // Allow additional classes
}) => {
  return (
    <div
      className={cn(
        "lesson-card p-4 border rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer",
        "bg-card text-card-foreground", // Using shadcn theme variables
        isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-border',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <h3 className="text-lg font-semibold mb-2">{lesson.name}</h3>
      {isCompleted && (
        <div className="completion-badge text-sm">
          <span className="font-semibold text-green-700 dark:text-green-400">Completed</span>
          {typeof score === 'number' && ( // Only show score if it's a number
            <span className="ml-2 text-muted-foreground">Score: {score}%</span>
          )}
        </div>
      )}
      {!isCompleted && (
        <p className="text-sm text-muted-foreground">Click to start lesson.</p>
      )}
    </div>
  );
};

LessonCard.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow string or number IDs
    name: PropTypes.string.isRequired,
  }).isRequired,
  isCompleted: PropTypes.bool,
  score: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default LessonCard;
