import type from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  questions: {},
  error: '',
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case type.START_REQUEST:
    return { ...state, isFetching: true };
  case type.RECEIVED_QUESTIONS:
    return { ...state, isFetching: false, questions: action.payload };
  case type.FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.error };
  default:
    return state;
  }
}

export default questionsReducer;
