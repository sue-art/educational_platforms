// src/pages/ActivityPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useModules from "../hooks/useModules";
import ActivityContent from "../components/ActivityContent";

/**
 * ActivityPage page
 *
 * @returns {JSX.Element} - Rendered page
 */

const ActivityPage = () => {
  const { moduleId, activityId } = useParams();
  const { getActivityById, isLoading, error } = useModules();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      const foundActivity = await getActivityById(moduleId, activityId);
      setActivity(foundActivity);
    };

    fetchActivity();
  }, [moduleId, activityId, getActivityById]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center">Loading activity...</p>
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

  if (!activity) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center">Activity not found</p>
        <Link
          to={`/phonics/module/${moduleId}`}
          className="text-blue-500 hover:underline block text-center mt-4"
        >
          Back to Module
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1>
        <title>{activity.title}</title>
      </h1>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link
            to={`/phonics/module/${moduleId}`}
            className="text-blue-500 hover:underline"
          >
            &larr; Back to Module
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">{activity.title}</h1>
        <p className="text-gray-700 mb-6">{activity.description}</p>

        {activity.instructions && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ul className="list-disc pl-5">
              {activity.instructions.map((instruction, index) => (
                <li key={index} className="mb-2">
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activity.materials && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Materials</h2>
            <div className="flex flex-wrap gap-2">
              {activity.materials.map((material, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}

        <ActivityContent activity={activity} />
      </div>
    </>
  );
};

export default ActivityPage;
