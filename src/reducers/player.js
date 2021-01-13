import { PLAYER } from '../actions';

const storage = JSON.parse(localStorage.getItem('state'));

const INITIAL_STATE = {
  name: storage.player.name || '',
  assertions: 0,
  score: 0,
  gravatarEmail: storage.player.gravatarEmail || '',
};

function playerReducer(state = INITIAL_STATE, action) {
  if (action.type === PLAYER) {
    return {
      ...state,
      name: action.player.name,
      assertions: action.player.assertions || 0,
      score: action.player.score || 0,
      gravatarEmail: action.player.gravatarEmail,
    };
  }
  return state;
}

export default playerReducer;
