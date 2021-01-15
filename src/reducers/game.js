import {
  REQUEST_STARTED,
  REQUEST_FAIL,
  FETCH_QUESTIONS_SUCCESS,
  EMAIL_HASH,
  UPDATE_ASSERTIONS,
  UPDATE_RANDOM_ANSWERS,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  questions: {},
  assertions: 0,
  hash: '',
  randomAnswers: [],
  sorted: false,
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
  case UPDATE_RANDOM_ANSWERS:
    return { ...state,
      randomAnswers: action.payload.randomAnswers,
      sorted: action.payload.sorted,
    };
  default:
    return state;
  }
};

export default gameReducer;
