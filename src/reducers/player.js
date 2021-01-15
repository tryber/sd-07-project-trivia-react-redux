import { EMAIL, LOGIN, SCORE, ASSERTIONS, GRAVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  email: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state, email: action.email,
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
  case GRAVATAR:
    return {
      ...state, gravatarEmail: action.gravatar,
    };
  default:
    return state;
  }
}

export default player;
