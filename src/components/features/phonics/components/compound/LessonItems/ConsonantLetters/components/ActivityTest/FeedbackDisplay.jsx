import React from "react";
import { Check, X } from "lucide-react";

export const FeedbackDisplay = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div
      className={`p-4 rounded-md mb-4 ${
        feedback.correct ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex items-center">
        {feedback.correct ? (
          <Check className="text-green-500 mr-2" />
        ) : (
          <X className="text-red-500 mr-2" />
        )}
        <p>{feedback.message}</p>
      </div>
    </div>
  );
};
