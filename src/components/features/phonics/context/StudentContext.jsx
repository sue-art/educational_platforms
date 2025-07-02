// src/contexts/StudentContext.jsx

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define action types
export const STUDENT_ACTIONS = {
  SET_STUDENT: "SET_STUDENT",
  SET_PROGRESS: "SET_PROGRESS",
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// Initial state
const initialState = {
  student: null,
  progress: {},
  loading: true,
  error: null,
  isAuthenticated: false,
};

// Reducer function
const studentReducer = (state, action) => {
  switch (action.type) {
    case STUDENT_ACTIONS.SET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false,
        isAuthenticated: !!action.payload,
      };

    case STUDENT_ACTIONS.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        loading: false,
      };

    case STUDENT_ACTIONS.UPDATE_PROGRESS:
      const { subject, lessonId, score } = action.payload;

      // Get current subject progress or initialize it
      const subjectProgress = state.progress[subject] || {
        completedLessons: [],
        scores: {},
      };

      return {
        ...state,
        progress: {
          ...state.progress,
          [subject]: {
            completedLessons: [
              ...new Set([...subjectProgress.completedLessons, lessonId]),
            ],
            scores: {
              ...subjectProgress.scores,
              [lessonId]: score,
            },
          },
        },
      };

    case STUDENT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case STUDENT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case STUDENT_ACTIONS.LOGIN:
      return {
        ...state,
        student: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case STUDENT_ACTIONS.LOGOUT:
      return {
        ...state,
        student: null,
        progress: {},
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

// Create the context
const StudentContext = createContext();

// Custom hook for using the context
export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};

// Selector functions for use with useSelector
export const selectUser = (state) => state.student;
export const isAuthenticated = (state) => state.isAuthenticated;

export const StudentProvider = ({ children }) => {
  // Use reducer instead of multiple useState calls
  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Destructure state for easier access
  const { student, progress, loading, error, isAuthenticated } = state;

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        dispatch({ type: STUDENT_ACTIONS.SET_LOADING, payload: true });

        // Check if user is already logged in (e.g., from localStorage)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch({ type: STUDENT_ACTIONS.SET_STUDENT, payload: userData });
          dispatch({
            type: STUDENT_ACTIONS.SET_PROGRESS,
            payload: userData.progress,
          });
        } else {
          dispatch({ type: STUDENT_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (err) {
        dispatch({
          type: STUDENT_ACTIONS.SET_ERROR,
          payload: "Failed to fetch student data",
        });
      }
    };

    fetchStudentData();
  }, []);

  // Update student progress
  const updateProgress = (subject, lessonId, score) => {
    dispatch({
      type: STUDENT_ACTIONS.UPDATE_PROGRESS,
      payload: { subject, lessonId, score },
    });

    // Here you would also update the backend
    // Example:
    // api.updateStudentProgress(student.id, subject, lessonId, score)
    //   .catch(err => console.error('Failed to update progress on server:', err));
  };

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: STUDENT_ACTIONS.SET_LOADING, payload: true });

      // Mock login - replace with actual API call
      // const response = await api.login(credentials);
      const userData = {
        id: 1,
        name: "John Doe",
        grade: "2",
        progress: {
          phonics: {
            completedLessons: [1, 2],
            scores: {
              1: 85,
              2: 90,
            },
          },
        },
      };

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch({ type: STUDENT_ACTIONS.LOGIN, payload: userData });
      return true;
    } catch (error) {
      dispatch({
        type: STUDENT_ACTIONS.SET_ERROR,
        payload: "Login failed. Please check your credentials.",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: STUDENT_ACTIONS.LOGOUT });
  };

  // Value to be provided by the context
  const value = {
    student,
    progress,
    loading,
    error,
    isAuthenticated,
    updateProgress,
    login,
    logout,
    dispatch,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};
