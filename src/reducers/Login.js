import { LOGIN } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, login: true, email: action.email, nome: action.name };
  default:
    return state;
  }
};

export default userReducer;
