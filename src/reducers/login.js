import { EMAIL, LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
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
  default:
    return state;
  }
}

export default login;
