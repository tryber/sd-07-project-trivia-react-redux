import types from '../actions/types';

const LOGIN_INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  tokenString: '',
  picture: '',
};

const player = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case types.LOGIN_INFO:
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  case types.REQUEST_TOKEN_SUCCESS:
    return ({
      ...state,
      tokenString: action.token,
    });
  case types.SCORE_UPDATE:
    return ({
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    });
  case types.RESET_SCORE:
    return ({
      ...state,
      score: 0,
      assertions: 0,
    });
  case types.SAVE_PICTURE:
    return ({
      ...state,
      picture: action.payload,
    });
  default:
    return state;
  }
};

export default player;
