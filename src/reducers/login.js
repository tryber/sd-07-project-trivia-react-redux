import { LOGIN, TOKEN_REQUEST } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state.Login,
      name: action.name,
      email: action.email,
    };
  case TOKEN_REQUEST:
    return {
      ...state, token: action.token.token,
    };
  default:
    return state;
  }
};

export default userReducer;
