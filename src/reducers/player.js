import {
  REQUEST_PLAYER,
  GET_AVATAR_PLAYER,
  SET_NAME,
  SET_ASSERTIONS,
  SET_SCORE,
  SET_GRAVATAR_EMAIL,
  FAILED_REQUEST,
} from '../actions/player';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  avatar: '',
  isFetching: false,
};

function player(state = initialState, action) {
  switch (action.type) {
  case REQUEST_PLAYER:
    return { ...state, isFetching: true };
  case GET_AVATAR_PLAYER:
    return { ...state, avatar: action.payload, isFetching: false };
  case SET_NAME:
    return { ...state, name: action.payload.name };
  case SET_ASSERTIONS:
    return { ...state, assertions: action.payload.assertions };
  case SET_SCORE:
    return { ...state, score: action.payload.score };
  case SET_GRAVATAR_EMAIL:
    return { ...state, gravatarEmail: action.payload.gravatarEmail };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default player;
