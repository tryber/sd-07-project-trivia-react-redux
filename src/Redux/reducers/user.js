import { SAVE_USER_DATA, AUTHENTICATION } from '../actions/index';

const INITIAL_STATE = {
  user: {},
  logged: false,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER_DATA:
    return {
      ...state,
      user: action.data,
    };
  case AUTHENTICATION:
    return {
      ...state,
      logged: action.auth,
    };
  default:
    return state;
  }
}
