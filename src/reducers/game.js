import { REQUEST_STARTED, REQUEST_FAIL, FETCH_QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  questions: {},
  score: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isLoading: true };
  case REQUEST_FAIL:
    return { ...state,
      isLoading: false,
      error: action.error.message,
    };
  case FETCH_QUESTIONS_SUCCESS:
    return { ...state,
      isLoading: false,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
