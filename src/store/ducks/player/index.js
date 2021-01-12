import PlayerTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.player;

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PlayerTypes.SIGNIN:
    return { ...state, state: action.player };
  case PlayerTypes.REQUEST_TOKEN: {
    return { ...state, token: action.token };
  }
  default:
    return state;
  }
};

export default playerReducer;
