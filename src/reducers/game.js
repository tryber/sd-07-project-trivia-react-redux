import {
  REQUEST_STARTED,
  REQUEST_FAIL,
  FETCH_QUESTIONS_SUCCESS,
  EMAIL_HASH,
  UPDATE_ASSERTIONS,
  UPDATE_SCORE,
  UPDATE_RANDOM_ANSWERS,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  questions: {},
  assertions: 0,
  score: 0,
  hash: '',
  timeLeft: 0,
  difficulty: null,
  randomAnswers: [],
  sorted: false,

};

function updateScoreFunc(state, action) {
  const { payload } = action;
  const { difficulty } = payload;
  const { timer } = payload;
  const level = {
    hard: {
      value: 3,
    },
    medium: {
      value: 2,
    },
    easy: {
      value: 1,
    },
  };
  const count = 10;
  const totalScore = count + (level[difficulty].value * timer);
  console.log(totalScore);
  return { ...state, score: state.score + totalScore };
}

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
  case UPDATE_SCORE:
    return updateScoreFunc(state, action);
  case UPDATE_ASSERTIONS:
    return { ...state,
      assertions: state.assertions + 1 };
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
