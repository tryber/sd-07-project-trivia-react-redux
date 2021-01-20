import { SAVE_PLAYER_DATA } from '../actions';

const INITIAL_STATE = [];

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER_DATA:
    return [
      ...state,
      { name: localStorage.username, score: action.payload, picture: localStorage.email },
    ];
  default:
    return state;
  }
};

export default rankingReducer;
