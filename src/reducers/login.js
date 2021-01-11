import { EMAIL, LOGIN, TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state, email: action.email,
    };
  case LOGIN:
    return {
      ...state, name: action.name,
    };
  case TOKEN:
    return {
      ...state, token: action.token,
    };
  default:
    return state;
  }
}

export default login;
