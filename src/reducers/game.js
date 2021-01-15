import {
  REQUEST_STARTED,
  REQUEST_FAIL,
  FETCH_QUESTIONS_SUCCESS,
  EMAIL_HASH,
  UPDATE_ASSERTIONS,
  UPDATE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  questions: {},
  score: 0,
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
  case UPDATE_SCORE:
    // const point = 10 *
    // 10 + (timer * dificuldade)
    return { ...state };
  // score: [...state.score, action.payload],
  // playerLocalStorage() {
  //   const { name, assertions, email, score } = this.state;
  //   console.log(name)
  //   localStorage.setItem('token', token);
  //   history.push('/game');
  //   player: {
  //     name,
  //     assertions,
  //     score,
  //     gravatarEmail
  //   }
  // }
  case UPDATE_ASSERTIONS:
    return { ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default gameReducer;
