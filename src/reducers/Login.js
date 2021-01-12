import { LOGIN } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state.Login,
      nome: action.nome,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
