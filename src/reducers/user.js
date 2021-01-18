import type from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case type.USER_EMAIL: {
    return { ...state, email: action.email };
  }

  case type.USER_NAME: {
    return { ...state, name: action.name };
  }

  default:
    return state;
  }
}

export default userReducer;
