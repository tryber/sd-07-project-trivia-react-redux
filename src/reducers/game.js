import {
  REQUEST_STARTED,
  REQUEST_FAIL,
  FETCH_QUESTIONS_SUCCESS,
  EMAIL_HASH,
  UPDATE_ASSERTIONS,
  RESET_ASSERTIONS,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  questions: {},
  assertions: 0,
  hash: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_HASH:
    return { ...state, hash: action.hash };
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
  case UPDATE_ASSERTIONS:
    return { ...state,
      assertions: state.assertions + 1,
    };
  case RESET_ASSERTIONS:
    return { ...state,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default gameReducer;
