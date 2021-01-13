import {
  REQUEST_QUESTIONS,
  REQUEST_FAILED,
  LIST_QUESTIONS,
} from './trivia.action';

const INITIAL_STATE = {
  isFetching: true,
  results: [],
  responseCode: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case LIST_QUESTIONS:
    return {
      ...state,
      results: action.payload.results,
      responseCode: action.payload.response_code,
      isFetching: false,
    };
  case REQUEST_FAILED:
    return action.error;
  default:
    return state;
  }
};

export default triviaReducer;
