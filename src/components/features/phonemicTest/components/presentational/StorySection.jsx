import React from 'react';
import PropTypes from 'prop-types';

/**
 * StorySection component displays a story containing target words
 * 
 * @param {Object} props Component props
 * @param {string} props.story Story text containing target words
 * @param {function} props.onContinue Callback when user wants to continue
 */
const StorySection = ({ story, onContinue }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Story Time</h2>
      <div className="p-4 bg-yellow-50 rounded-md mb-6 leading-relaxed">
        {story}
      </div>
      <button 
        onClick={onContinue}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Continue to Reading Questions
      </button>
    </div>
  );
};

StorySection.propTypes = {
  story: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired
};

export default StorySection;
