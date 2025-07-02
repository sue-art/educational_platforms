// src/components/common/ActivityCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * ActivityCard component
 *
 * @param {Object} props - Component props
 * @param {Object} props.activity - Activity data
 * @param {string} props.moduleId - Module ID
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Rendered component
 */

const ActivityCard = React.memo(
  ({ activity, moduleId, className, ...props }) => {
    return (
      <div
        className={cn(
          "border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {activity.description}
          </p>

          <div className="flex justify-between items-center">
            <Link
              to={`/phonics/module/${moduleId}/activity/${activity.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Activity &rarr;
            </Link>

            {activity.materials && (
              <div className="text-xs text-gray-500">
                {activity.materials.length}{" "}
                {activity.materials.length === 1 ? "material" : "materials"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ActivityCard;
