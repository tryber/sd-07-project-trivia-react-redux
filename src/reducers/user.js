import type from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  picture: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case type.USER_EMAIL:
    return { ...state, email: action.email };
  case type.USER_NAME:
    return { ...state, name: action.name };
  case type.GET_PICTURE:
    return { ...state, picture: action.picture };
  default:
    return state;
  }
}

export default userReducer;
