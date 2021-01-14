import { EMAIL, LOGIN, SCORE, ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  point: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state, gavatarEmail: action.email,
    };
  case LOGIN:
    return {
      ...state, name: action.name,
    };
  case SCORE:
    return {
      ...state, score: action.score,
    };
  case ASSERTIONS:
    return {
      ...state, assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default player;
