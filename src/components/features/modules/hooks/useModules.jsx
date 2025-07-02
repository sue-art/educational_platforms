import React, { useState, useEffect, useCallback } from "react";

import { fetchModules } from "../api/modulesApi";

/**
 * useModules custom hook
 *
 * @returns {Object} Hook return values
 */
function useModules() {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all modules
  const getAllModules = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchModules();
      setModules(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch modules");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a module by ID
  const getModuleById = useCallback(
    async (moduleId) => {
      setIsLoading(true);
      setError(null);

      try {
        // If modules are already loaded, find from state
        if (modules.length > 0) {
          const module = modules.find((m) => m.id === moduleId);
          setIsLoading(false);
          return module || null;
        }

        // Otherwise fetch all modules and find the one we need
        const allModules = await fetchModules();
        setModules(allModules);
        return allModules.find((m) => m.id === moduleId) || null;
      } catch (err) {
        setError(err.message || "Failed to fetch module");
        setIsLoading(false);
        return null;
      }
    },
    [modules]
  );

  // Get an activity by ID
  const getActivityById = useCallback(
    async (moduleId, activityId) => {
      setIsLoading(true);
      setError(null);

      try {
        const module = await getModuleById(moduleId);
        if (!module) {
          throw new Error("Module not found");
        }

        const activity = module.activities.find((a) => a.id === activityId);
        return activity || null;
      } catch (err) {
        setError(err.message || "Failed to fetch activity");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getModuleById]
  );

  // Load modules on initial render
  useEffect(() => {
    getAllModules();
  }, [getAllModules]);

  return {
    modules,
    isLoading,
    error,
    getAllModules,
    getModuleById,
    getActivityById,
  };
}

export { useModules };
