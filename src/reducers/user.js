import { NEW_PLAYER } from '../constants';

const INITIAL_STATE = { email: '', name: '' };

const user = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case NEW_PLAYER:
    return { email: action.email, name: action.name };
  default:
    return state;
  }
};

export default user;
