import { PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  if (action.type === PLAYER) {
    return {
      ...state,
      name: action.player.name,
      assertions: action.player.assertions,
    }
  }
  return state;
}

export default playerReducer;