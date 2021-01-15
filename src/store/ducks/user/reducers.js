import md5 from 'crypto-js/md5';
import userTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.user;

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case userTypes.SIGNIN:
    return {
      ...state,
      player: {
        name: action.payload.name,
        gravatarEmail: action.payload.gravatarEmail,
        picture: `https://www.gravatar.com/avatar/${md5(action.payload.gravatarEmail)}`,
        score: 0,
        assertions: 0,
      },
    };
  case userTypes.ADD_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + Number(action.payload),
        assertions: Number(state.player.assertions) + 1,
      },
    };
  default:
    return state;
  }
};

export default user;
