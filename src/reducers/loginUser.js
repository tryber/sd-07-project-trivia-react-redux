import { ADD_EMAIL, ADD_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.email };
  case ADD_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
}
