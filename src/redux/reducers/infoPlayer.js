import { SAVE_EMAIL, SAVE_NAME } from '../actions/index';

const initialState = {
  email: '',
  name: '',
};

const infoPlayer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return { ...state, namePlayer: action.name };
  case SAVE_EMAIL:
    return { ...state, emailPlayer: action.email };
  default:
    return state;
  }
};

export default infoPlayer;
