// src/pages/PhonicsPage.jsx
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useModules } from "@/features/modules/hooks/useModules";

/**
 * PhonicsPage page
 *
 * @returns {JSX.Element} - Rendered page
 */
function PhonicsPage() {
  const { modules, isLoading, error, getAllModules } = useModules();

  useEffect(() => {
    getAllModules();
  }, [getAllModules]);

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Phonics tt Learning</h1>

        <p className="text-gray-700 mb-8 max-w-3xl">
          Phonics is a method of teaching people to read by correlating sounds
          with letters or groups of letters. Our phonics program is designed to
          help students develop strong reading and writing skills through a
          structured approach to learning letter-sound relationships.
        </p>
        <p>
          {" "}
          help students develop strong reading and writing skills through a
        </p>

        {isLoading && <p className="text-center py-8">Loading modules...</p>}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}

        {!isLoading && modules.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/phonics/module/${module.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Module &rarr;
                    </Link>
                    <span className="text-sm text-gray-500">
                      {module.activities.length}{" "}
                      {module.activities.length === 1
                        ? "activity"
                        : "activities"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && modules.length === 0 && !error && (
          <p className="text-center py-8">No modules found.</p>
        )}
      </div>
    </>
  );
}

export default PhonicsPage;
