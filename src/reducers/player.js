import {
  REQUEST_PLAYER,
  GET_AVATAR_PLAYER,
  SET_NAME,
  SET_ASSERTIONS,
  SET_SCORE,
  SET_GRAVATAR,
  FAILED_REQUEST,
  ADD_TOKEN,
} from '../actions/player';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatar: '',
  token: '',
  avatar: '',
  isFetching: false,
};

function player(state = initialState, action) {
  switch (action.type) {
  case ADD_TOKEN:
    localStorage.setItem('token', action.token);
    return { ...state, token: action.token };
  case REQUEST_PLAYER:
    return { ...state, isFetching: true };
  case GET_AVATAR_PLAYER:
    return { ...state, avatar: action.payload, isFetching: false };
  case SET_NAME:
    return { ...state, name: action.payload };
  case SET_ASSERTIONS:
    return { ...state, assertions: action.payload.assertions };
  case SET_SCORE:
    return { ...state, score: action.payload.score };
  case SET_GRAVATAR:
    const gravatarUrl = `https://www.gravatar.com/avatar/${action.payload}`;
    return { ...state, gravatar: gravatarUrl };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default player;
