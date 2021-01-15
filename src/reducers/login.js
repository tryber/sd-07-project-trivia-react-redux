import { LOGIN, AVATAR } from '../actions/actionsTypes';

const initialState = {
  email: '',
  name: '',
  avatar: '',
};

const clickLogin = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, name: action.payload.name };
  case AVATAR:
    return { ...state, avatar: action.avatar };
  default:
    return state;
  }
};

export default clickLogin;
