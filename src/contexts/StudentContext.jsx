import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define action types
export const STUDENT_ACTIONS = {
  SET_STUDENT: 'SET_STUDENT',
  SET_PROGRESS: 'SET_PROGRESS',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  student: null,
  progress: {},
  loading: true,
  error: null
};

// Reducer function
const studentReducer = (state, action) => {
  switch (action.type) {
    case STUDENT_ACTIONS.SET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };

    case STUDENT_ACTIONS.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        loading: false
      };

    case STUDENT_ACTIONS.UPDATE_PROGRESS:
      const { subject, lessonId, score } = action.payload;

      // Get current subject progress or initialize it
      const subjectProgress = state.progress[subject] || {
        completedLessons: [],
        scores: {}
      };

      return {
        ...state,
        progress: {
          ...state.progress,
          [subject]: {
            completedLessons: [...new Set([...subjectProgress.completedLessons, lessonId])],
            scores: {
              ...subjectProgress.scores,
              [lessonId]: score
            }
          }
        }
      };

    case STUDENT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case STUDENT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
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
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider = ({ children }) => {
  // Use reducer instead of multiple useState calls
  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Destructure state for easier access
  const { student, progress, loading, error } = state;

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        dispatch({ type: STUDENT_ACTIONS.SET_LOADING, payload: true });

        // Mock data - replace with actual API call
        const studentData = {
          id: 1,
          name: 'John Doe',
          grade: '2',
          progress: {
            phonics: {
              completedLessons: [1, 2],
              scores: {
                1: 85,
                2: 90
              }
            }
          }
        };

        dispatch({ type: STUDENT_ACTIONS.SET_STUDENT, payload: studentData });
        dispatch({ type: STUDENT_ACTIONS.SET_PROGRESS, payload: studentData.progress });
      } catch (err) {
        dispatch({
          type: STUDENT_ACTIONS.SET_ERROR,
          payload: 'Failed to fetch student data'
        });
      }
    };

    fetchStudentData();
  }, []);

  // Update student progress
  const updateProgress = (subject, lessonId, score) => {
    dispatch({
      type: STUDENT_ACTIONS.UPDATE_PROGRESS,
      payload: { subject, lessonId, score }
    });

    // Here you would also update the backend
    // Example:
    // import api from '../services/api'; // Assuming api.js is set up
    // api.updateStudentProgress(student.id, subject, lessonId, score)
    //   .catch(err => console.error('Failed to update progress on server:', err));
    console.log(`Mock API: Update progress for ${subject}, lesson ${lessonId} with score ${score}`);
  };

  // Value to be provided by the context
  const value = {
    student,
    progress,
    loading,
    error,
    updateProgress
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
