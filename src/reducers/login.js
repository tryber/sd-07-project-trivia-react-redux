import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  username: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email, username: action.username };
  default:
    return state;
  }
}
