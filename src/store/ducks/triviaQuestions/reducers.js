import triviaQuestionsTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.triviaQuestions;

const triviaQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case triviaQuestionsTypes.REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case triviaQuestionsTypes.RECEIVE_SUCCESS:
    return {
      ...state,
      questions: action.payload,
      isLoading: false,
    };
  case triviaQuestionsTypes.RECEIVE_FAIL:
    return {
      ...state,
      questions: action.payload,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default triviaQuestions;
