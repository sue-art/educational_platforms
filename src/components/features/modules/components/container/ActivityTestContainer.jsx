import React from "react";

/* * ActivityTestContainer component
 * This component serves as a container for the ActivityTest feature.

    * It is responsible for rendering the main layout and managing the test context.
    *
    **/
const ActivityTestContainer = ({ children }) => {
  return (
    <div className="activity-test-container">
      <h1 className="text-2xl font-bold mb-4">Activity Test</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">{children}</div>
    </div>
  );
};

export default ActivityTestContainer;
