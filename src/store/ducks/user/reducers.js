import userTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.user;

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case userTypes.SIGNIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.gravatarEmail,
      },
    };
  case userTypes.ADD_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload,
      },
    };
  default:
    return state;
  }
};

export default user;
