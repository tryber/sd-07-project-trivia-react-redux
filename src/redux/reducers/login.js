import { LOGIN_EMAIL } from '../actions';

const LOGIN_INITIAL_STATE = {
  name: '',
  email: '',
  scoreboard: 0,
  avatar: '',
};

const login = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_EMAIL:
    return ({
      ...state,
      email: action.user.email,
      name: action.user.name,
    });
  default:
    return state;
  }
};

export default login;
