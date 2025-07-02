import React, { createContext, useContext, useReducer } from "react";

// Initial state for the test
const initialState = {
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  hintsUsed: [],
  testCompleted: false,
  testData: null,
  loading: true,
  error: null,
};

// Actions for the reducer
const actions = {
  LOAD_TEST: "LOAD_TEST",
  LOAD_TEST_SUCCESS: "LOAD_TEST_SUCCESS",
  LOAD_TEST_ERROR: "LOAD_TEST_ERROR",
  ANSWER_QUESTION: "ANSWER_QUESTION",
  USE_HINT: "USE_HINT",
  NEXT_QUESTION: "NEXT_QUESTION",
  COMPLETE_TEST: "COMPLETE_TEST",
  RESET_TEST: "RESET_TEST",
};

// Reducer function to handle state changes
const testReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_TEST:
      return { ...state, loading: true };
    case actions.LOAD_TEST_SUCCESS:
      return {
        ...state,
        testData: action.payload,
        loading: false,
        error: null,
      };
    case actions.LOAD_TEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.ANSWER_QUESTION:
      const { questionId, answer, isCorrect } = action.payload;
      const scoreIncrement = isCorrect
        ? state.testData.scoring.pointsPerQuestion
        : 0;

      return {
        ...state,
        answers: [...state.answers, { questionId, answer, isCorrect }],
        score: state.score + scoreIncrement,
      };
    case actions.USE_HINT:
      const hintPenalty = state.testData.scoring.penaltyForHints;

      return {
        ...state,
        hintsUsed: [...state.hintsUsed, action.payload],
        score: Math.max(0, state.score - hintPenalty),
      };
    case actions.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case actions.COMPLETE_TEST:
      return {
        ...state,
        testCompleted: true,
      };
    case actions.RESET_TEST:
      return {
        ...initialState,
        testData: state.testData,
        loading: false,
      };
    default:
      return state;
  }
};

// Create context
const TestContext = createContext();

// Context provider component
export const TestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  // Actions to be used by components
  const loadTest = (testId) => {
    dispatch({ type: actions.LOAD_TEST });
    // Simulate API call to fetch test data
    fetch(`http://localhost:3000/test/${testId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: actions.LOAD_TEST_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actions.LOAD_TEST_ERROR,
          payload: error.message,
        });
      });
  };

  const answerQuestion = (questionId, answer, isCorrect) => {
    dispatch({
      type: actions.ANSWER_QUESTION,
      payload: { questionId, answer, isCorrect },
    });
  };

  const useHint = (questionId) => {
    dispatch({
      type: actions.USE_HINT,
      payload: questionId,
    });
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.testData.questions.length - 1) {
      dispatch({ type: actions.NEXT_QUESTION });
    } else {
      dispatch({ type: actions.COMPLETE_TEST });
    }
  };

  const resetTest = () => {
    dispatch({ type: actions.RESET_TEST });
  };

  // Value to be provided to consumers
  const value = {
    ...state,
    loadTest,
    answerQuestion,
    useHint,
    nextQuestion,
    resetTest,
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

// Custom hook for using the test context
export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTestContext must be used within a TestProvider");
  }
  return context;
};
