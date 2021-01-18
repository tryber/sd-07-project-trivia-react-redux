import {
  REQUEST_NEW_PLAYER,
  SET_SCORE,
  FAILED_REQUEST,
  ADD_TOKEN,
  SET_ASSERTIONS,
  ADD_RANKING,
} from '../actions/player';

const initialState = {
  token: '',
  gravatarEmail: '',
  name: '',
  score: 0,
  count: 30,
  assertions: 0,
  ranking: [],
};

function player(state = initialState, action) {
  const getTokenSaved = JSON.parse(localStorage.getItem('token'));
  const tokenLocal = getTokenSaved === null ? [] : getTokenSaved;
  switch (action.type) {
  case REQUEST_NEW_PLAYER:
    return {
      ...state,
      name: action.player.player.name,
      gravatarEmail: action.player.player.gravatarEmail,
      score: action.player.player.score,
      assertions: action.player.player.assertions,
    };

  case ADD_TOKEN:
    tokenLocal.push(action.token);
    localStorage.setItem('token', JSON.stringify(tokenLocal));
    return { ...state, token: action.token };

  case SET_SCORE:
    return { ...state, score: action.score };

  case SET_ASSERTIONS:
    return { ...state, assertions: action.assertions };

  case ADD_RANKING:
    return { ...state, ranking: [...state.ranking, action.ranking] };

  case FAILED_REQUEST:
    return state;

  default:
    return state;
  }
}

export default player;
