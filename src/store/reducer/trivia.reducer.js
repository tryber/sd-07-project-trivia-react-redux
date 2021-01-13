import {
  REQUEST_QUERIES,
  REQUEST_FAILED,
  LIST_QUERIES,
} from './trivia.action';

const INITIAL_STATE = {
  isFetching: false,
  results: [],
  responseCode: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUERIES:
    return { ...state, isFetching: true };
  case LIST_QUERIES:
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
