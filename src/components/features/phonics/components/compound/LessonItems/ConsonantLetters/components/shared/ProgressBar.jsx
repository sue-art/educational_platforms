import React from "react";

export const ProgressBar = ({ value, max, className }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
