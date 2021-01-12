import type from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case type.USER_EMAIL: {
    return { ...state, email: action.email };
  }

  default:
    return state;
  }
}

export default userReducer;
