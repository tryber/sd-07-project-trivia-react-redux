import PlayerTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.player;

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PlayerTypes.SIGNIN: {
    const { name, gravatarEmail, hash } = action.payload;
    return { ...state, name, gravatarEmail, hash };
  }
  case PlayerTypes.INCLUDE_TOKEN: {
    const { token } = action;
    return { ...state, token };
  }
  default:
    return state;
  }
};

export default player;
