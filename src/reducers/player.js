import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  FAILED_REQUEST,
  UPDATE_SCORE,
  NEW_GAME,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  image: '',
  score: 0,
  assertions: 0,
  isFetchingToken: false,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isFetchingToken: true };
  case RECEIVE_TOKEN:
    return { ...state, ...action.payload, isFetchingToken: false };
  case FAILED_REQUEST:
    return { ...state, isFetchingToken: false, error: action.error };
  case UPDATE_SCORE: {
    const newState = {
      ...state,
      score: state.score + action.value,
      assertions: state.assertions + 1,
    };
    const { name, email, score, assertions } = newState;
    const newLocal = JSON.stringify({ player: {
      name,
      score,
      assertions,
      gravatarEmail: email,
    } });
    localStorage.setItem('state', newLocal);
    return newState;
  }
  case NEW_GAME: {
    const newGame = JSON.stringify({ player: INITIAL_STATE });
    localStorage.setItem('state', newGame);
    localStorage.setItem('token', '');
    return INITIAL_STATE;
  }
  default:
    return state;
  }
}

export default user;
