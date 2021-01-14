import { PLAYER } from '../actions';

const INITIAL_STATE = [];
function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER:
    return [
      ...state, action.rank,
    ];
  default:
    return state;
  }
}

export default player;
