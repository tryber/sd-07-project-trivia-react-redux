import { UPDATE_EMAIL, UPDATE_NAME } from '../constants';

const INITIAL_STATE = {
  email: '',
  name: '',
  auth: false,
};

const user = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case UPDATE_EMAIL:
    return { ...state, email: action.payload };
  case UPDATE_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
};

export default user;
