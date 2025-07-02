// src/features/modules/components/ActivityContent.jsx
import React from "react";
import { cn } from "@/lib/utils";
import ConsonantSounds from "./ConsonantSounds";
import ConsonantLetters from "./activityType/ConsonantLetters";

/**
 * ActivityContent component
 *
 * @param {Object} props - Component props
 * @param {Object} props.activity - Activity data
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Rendered component
 */
function ActivityContent({ activity, className, ...props }) {
  // Map of activity components
  const activityComponents = {
    ConsonantSounds: ConsonantSounds,
    ConsonantLetters: ConsonantLetters,
    // Add other activity components as needed
  };

  // If the activity has a specific component, render it
  if (activity.component && activityComponents[activity.component]) {
    const ActivityComponent = activityComponents[activity.component];
    return <ActivityComponent activity={activity} />;
  }

  // Default content if no specific component is defined
  return (
    <div className={cn("mt-8 bg-gray-50 p-6 rounded-lg", className)} {...props}>
      <h2 className="text-xl font-semibold mb-4">Activity Content</h2>
      <p className="text-gray-700">
        This activity doesn't have specific interactive content yet. Please
        follow the instructions above to complete this activity.
      </p>
    </div>
  );
}

export default ActivityContent;
