import types from '../actions/types';

const LOGIN_INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  tokenString: '',
};

const player = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case types.LOGIN_INFO:
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  // case types.IS_FETCHING:
  //   return ({
  //     ...state,
  //     isLoading: true,
  //   });
  case types.REQUEST_TOKEN_SUCCESS:
    return ({
      ...state,
      // isLoading: false,
      tokenString: action.token,
    });
  default:
    return state;
  }
};

export default player;
