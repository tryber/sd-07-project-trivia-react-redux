import { EMAIL, LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
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
  default:
    return state;
  }
}

export default player;
