import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useModules } from "../../hooks/useModules";
import ActivityContent from "../ActivityContent";

/**
 * ModulePage page
 *
 * @returns {JSX.Element} - Rendered page
 */
function ModulePage() {
  const { moduleId } = useParams();
  const { getModuleById, isLoading, error } = useModules();
  const [module, setModule] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [activeActivityId, setActiveActivityId] = useState("activity-101");

  useEffect(() => {
    const fetchModule = async () => {
      const foundModule = await getModuleById(moduleId);
      setModule(foundModule);

      // Set the default selected activity to the first activity if available
      if (
        foundModule &&
        foundModule.activities &&
        foundModule.activities.length > 0
      ) {
        setSelectedActivity(foundModule.activities[0]);
      }
    };

    fetchModule();
  }, [moduleId, getModuleById]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setActiveActivityId(activity.id); // Set the clicked activity as active
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center">Loading module...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center">Module not found</p>
        <Link
          to="/phonics"
          className="text-blue-500 hover:underline block text-center mt-4"
        >
          Back to Phonics
        </Link>
      </div>
    );
  }

  return (
    <>
      <title>{module.title}</title>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link to="/phonics" className="text-emerald-500 hover:underline">
            &larr; Back to Phonics Learning
          </Link>
        </div>

        <h1 className="text-3xl text-emerald-400 font-bold">{module.title}</h1>
        <p className="text-gray-500 mb-8">{module.description}</p>

        {module.teachingStrategies && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Teaching Strategies</h2>
            <ul className="list-disc pl-5">
              {module.teachingStrategies.map((strategy, index) => (
                <li key={index} className="mb-1">
                  {strategy}
                </li>
              ))}
            </ul>
          </div>
        )}

        {module.activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => handleActivityClick(activity)}
            className={`px-3 py-1 mx-2  rounded-full text-sm ${
              activeActivityId === activity.id
                ? "bg-emerald-400 text-white" // Active class
                : "bg-amber-200 text-white hover:bg-emerald-400"
            }`}
          >
            {activity.title}
          </button>
        ))}

        {selectedActivity && (
          <div className="mt-8 pt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-500">
              {selectedActivity.title}
            </h2>
            <ActivityContent activity={selectedActivity} />
            <p className="text-gray-700">{selectedActivity.content}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ModulePage;
