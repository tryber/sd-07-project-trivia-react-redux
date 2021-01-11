import { SET_USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_LOGIN:
    return { ...state, name: action.name, email: action.email };
  default: return state;
  }
};

export default userReducer;
