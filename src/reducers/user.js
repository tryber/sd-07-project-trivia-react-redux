import { LOGIN } from '../action/index';

const INITIAL_STATE = {
  user: [],
};

export default function userReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
  case LOGIN:
    return ({
      ...state, user: [...state.user, action.payload],
    });
  default:
    return state;
  }
}
