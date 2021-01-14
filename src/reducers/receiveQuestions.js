import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_FAIL,
} from '../actions/fetchQuestionsTrivia';

const INITIAL_STATE = {
  isFetching: false,
  questions: {},
};

const receiveQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.questions,
      isFetching: false,
    };
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_QUESTIONS_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default receiveQuestions;
