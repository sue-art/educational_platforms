import React from 'react';
// import './ProgressBar.css'; // CSS was commented out in user's file

function ProgressBar({ progress = 0, label = '' }) {
  return (
    <div className="progress-bar-container">
      {label && <span className="progress-bar-label">{label}</span>}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
