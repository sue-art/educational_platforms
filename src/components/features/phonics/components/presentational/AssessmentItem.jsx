import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

const AssessmentItem = ({ item, onSelectAnswer, className }) => {
  // This is a very basic placeholder.
  // The actual structure will depend heavily on the type of assessment item (e.g., multiple choice, fill-in-the-blank).
  return (
    <div className={cn("assessment-item p-4 border rounded-lg mb-4 bg-card text-card-foreground", className)}>
      <h4 className="font-semibold text-md mb-2">{item.question || "Question placeholder"}</h4>
      {/* Placeholder for answer options or input area */}
      <div className="space-y-2">
        {(item.options || ['Option A', 'Option B']).map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(item.id, option)}
            className="block w-full text-left p-2 border rounded hover:bg-accent hover:text-accent-foreground"
          >
            {option}
          </button>
        ))}
      </div>
      {/* Example for a different type of item */}
      {/* {item.type === 'fill-in-blank' && <input type="text" className="input" />} */}
    </div>
  );
};

AssessmentItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    question: PropTypes.string,
    options: PropTypes.array,
    // Add other expected properties based on assessment item structure
  }).isRequired,
  onSelectAnswer: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AssessmentItem;
