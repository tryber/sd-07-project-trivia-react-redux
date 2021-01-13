import { LOGIN, TOKEN_REQUEST } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state.Login,
      nome: action.nome,
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
