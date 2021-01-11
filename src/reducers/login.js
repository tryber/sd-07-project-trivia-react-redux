import { LOGIN } from '../actions/actionsTypes';

const initialState = {
  email: '',
  name: '',
};

const clickLogin = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
};

export default clickLogin;
