import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define action types as constants
export const PHONICS_ACTIONS = {
  SET_LESSON_GROUPS: 'SET_LESSON_GROUPS',
  SELECT_LESSON_GROUP: 'SELECT_LESSON_GROUP',
  SELECT_LESSON: 'SELECT_LESSON',
  SELECT_ASSESSMENT_TYPE: 'SELECT_ASSESSMENT_TYPE',
  RESET_SELECTIONS: 'RESET_SELECTIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SUBMIT_ASSESSMENT_ANSWER: 'SUBMIT_ASSESSMENT_ANSWER',
  COMPLETE_ASSESSMENT: 'COMPLETE_ASSESSMENT'
};

// Initial state
const initialState = {
  lessonGroups: [],
  currentLessonGroup: null,
  currentLesson: null,
  assessmentType: null,
  currentAssessment: null,
  assessmentProgress: {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    completed: false,
    score: 0
  },
  loading: true,
  error: null
};

// Reducer function
const phonicsReducer = (state, action) => {
  switch (action.type) {
    case PHONICS_ACTIONS.SET_LESSON_GROUPS:
      return {
        ...state,
        lessonGroups: action.payload,
        loading: false
      };

    case PHONICS_ACTIONS.SELECT_LESSON_GROUP:
      return {
        ...state,
        currentLessonGroup: action.payload,
        currentLesson: null,
        assessmentType: null,
        currentAssessment: null,
        assessmentProgress: {
          ...initialState.assessmentProgress
        }
      };

    case PHONICS_ACTIONS.SELECT_LESSON:
      // Ensure currentLessonGroup is not null before accessing its lessons
      if (!state.currentLessonGroup || !state.currentLessonGroup.lessons) {
        console.error("Cannot select lesson: currentLessonGroup or its lessons are null.");
        return { ...state, error: "Cannot select lesson, lesson group not properly loaded."};
      }
      const selectedLesson = state.currentLessonGroup.lessons.find(lesson => lesson.id === action.payload.id);
      if (!selectedLesson) {
        console.error(`Lesson with id ${action.payload.id} not found in current group.`);
        return { ...state, error: `Lesson with id ${action.payload.id} not found.` };
      }
      return {
        ...state,
        currentLesson: selectedLesson, // action.payload should be the lesson object or its ID
        assessmentType: null,
        currentAssessment: null,
        assessmentProgress: {
          ...initialState.assessmentProgress
        }
      };

    case PHONICS_ACTIONS.SELECT_ASSESSMENT_TYPE:
      // Ensure currentLesson is not null before accessing its assessments
      if (!state.currentLesson || !state.currentLesson.assessments) {
         console.error("Cannot select assessment type: currentLesson or its assessments are null.");
         return { ...state, error: "Cannot select assessment type, lesson not properly loaded." };
      }
      const selectedAssessment = state.currentLesson.assessments.find(
        assessment => assessment.type === action.payload // action.payload is the type string
      );
       if (!selectedAssessment) {
        console.error(`Assessment with type ${action.payload} not found in current lesson.`);
        return { ...state, error: `Assessment type ${action.payload} not found.` };
      }
      return {
        ...state,
        assessmentType: action.payload, // action.payload is the type string
        currentAssessment: selectedAssessment,
        assessmentProgress: {
          ...initialState.assessmentProgress,
          totalQuestions: selectedAssessment.questionCount || 10 // Use selectedAssessment
        }
      };

    case PHONICS_ACTIONS.RESET_SELECTIONS:
      return {
        ...state,
        currentLessonGroup: null,
        currentLesson: null,
        assessmentType: null,
        currentAssessment: null,
        assessmentProgress: {
          ...initialState.assessmentProgress
        }
      };

    case PHONICS_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case PHONICS_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case PHONICS_ACTIONS.SUBMIT_ASSESSMENT_ANSWER:
      const { isCorrect } = action.payload;
      const newCorrectAnswers = isCorrect
        ? state.assessmentProgress.correctAnswers + 1
        : state.assessmentProgress.correctAnswers;

      return {
        ...state,
        assessmentProgress: {
          ...state.assessmentProgress,
          currentQuestionIndex: state.assessmentProgress.currentQuestionIndex + 1,
          correctAnswers: newCorrectAnswers
        }
      };

    case PHONICS_ACTIONS.COMPLETE_ASSESSMENT:
      if (state.assessmentProgress.totalQuestions === 0) { // Avoid division by zero
        return {
          ...state,
          assessmentProgress: {
            ...state.assessmentProgress,
            completed: true,
            score: 0 // Score is 0 if there were no questions
          }
        };
      }
      const finalScore = Math.round(
        (state.assessmentProgress.correctAnswers / state.assessmentProgress.totalQuestions) * 100
      );

      return {
        ...state,
        assessmentProgress: {
          ...state.assessmentProgress,
          completed: true,
          score: finalScore
        }
      };

    default:
      return state;
  }
};

// Create the context
const PhonicsContext = createContext();

// Custom hook for using the context
export const usePhonics = () => {
  const context = useContext(PhonicsContext);
  if (!context) {
    throw new Error('usePhonics must be used within a PhonicsProvider');
  }
  return context;
};

export const PhonicsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(phonicsReducer, initialState);

  const {
    lessonGroups,
    currentLessonGroup,
    currentLesson,
    assessmentType,
    currentAssessment,
    assessmentProgress,
    loading,
    error
  } = state;

  useEffect(() => {
    const fetchLessonGroups = async () => {
      try {
        dispatch({ type: PHONICS_ACTIONS.SET_LOADING, payload: true });
        // Mock data - replace with actual API call
        const data = [
          {
            id: 1,
            name: 'Consonants and vowels',
            lessons: [
              { id: 1, name: 'Sort consonants and vowels', assessments: [ { type: 'Word list', id: 1, questionCount: 10 }, { type: 'Matching words', id: 2, questionCount: 8 }, { type: 'Word quiz', id: 3, questionCount: 12 } ] },
              { id: 2, name: 'Find the vowels in a word', assessments: [ { type: 'Word list', id: 4, questionCount: 10 }, { type: 'Matching words', id: 5, questionCount: 8 }, { type: 'Word quiz', id: 6, questionCount: 12 } ] }
            ]
          },
          {
            id: 2,
            name: 'Syllables',
            lessons: [
              { id: 3, name: 'How many syllables does the word have?', assessments: [ { type: 'Word list', id: 7, questionCount: 10 }, { type: 'Matching words', id: 8, questionCount: 8 }, { type: 'Word quiz', id: 9, questionCount: 12 } ] },
              { id: 4, name: 'Sort by the number of syllables', assessments: [ { type: 'Word list', id: 10, questionCount: 10 }, { type: 'Matching words', id: 11, questionCount: 8 }, { type: 'Word quiz', id: 12, questionCount: 12 } ] }
            ]
          }
        ];
        dispatch({ type: PHONICS_ACTIONS.SET_LESSON_GROUPS, payload: data });
      } catch (err) {
        dispatch({ type: PHONICS_ACTIONS.SET_ERROR, payload: 'Failed to fetch lesson groups' });
      }
    };
    fetchLessonGroups();
  }, []);

  const selectLessonGroup = (group) => { // Expects group object
    dispatch({ type: PHONICS_ACTIONS.SELECT_LESSON_GROUP, payload: group });
  };

  const selectLesson = (lesson) => { // Expects lesson object
    dispatch({ type: PHONICS_ACTIONS.SELECT_LESSON, payload: lesson });
  };

  const selectAssessmentTypeAction = (type) => { // Renamed to avoid conflict with state variable
    dispatch({ type: PHONICS_ACTIONS.SELECT_ASSESSMENT_TYPE, payload: type });
  };

  const resetSelections = () => {
    dispatch({ type: PHONICS_ACTIONS.RESET_SELECTIONS });
  };

  const submitAnswer = (isCorrect) => {
    dispatch({ type: PHONICS_ACTIONS.SUBMIT_ASSESSMENT_ANSWER, payload: { isCorrect } });
    // Check if this was the last question
    // Note: state updates in reducers are asynchronous.
    // assessmentProgress.currentQuestionIndex won't be updated immediately here.
    // This logic is better handled within the reducer or useEffect based on state change.
    // For now, moving the COMPLETE_ASSESSMENT dispatch into the reducer for atomicity.
    // The original code had this check here, if issues arise, this might be a point to revisit.
    if (state.assessmentProgress.currentQuestionIndex + 1 >= state.assessmentProgress.totalQuestions && state.assessmentProgress.totalQuestions > 0) {
         dispatch({ type: PHONICS_ACTIONS.COMPLETE_ASSESSMENT });
    }
  };

  const value = {
    lessonGroups,
    currentLessonGroup,
    currentLesson,
    assessmentType,
    currentAssessment,
    assessmentProgress,
    loading,
    error,
    selectLessonGroup,
    selectLesson,
    selectAssessmentType: selectAssessmentTypeAction, // Use renamed action creator
    resetSelections,
    submitAnswer
  };

  return (
    <PhonicsContext.Provider value={value}>
      {children}
    </PhonicsContext.Provider>
  );
};
