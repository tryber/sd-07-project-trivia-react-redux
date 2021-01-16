import {
  SAVE_USER_DATA,
} from '../actions/index';

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
      logged: true,
    };
  default:
    return state;
  }
}
