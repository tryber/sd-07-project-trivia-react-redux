import { ALLPLAYER } from '../actions';

const INITIAL_STATE = [];
function allplayer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ALLPLAYER:
    return [
      ...state, action.rank,
    ];
  default:
    return state;
  }
}

export default allplayer;
