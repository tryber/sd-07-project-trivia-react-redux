import { ACC_COUNTER } from '../actions/index';

const initialState = {
  scoreboard: 0,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
  case ACC_COUNTER:
    return { timer: action.timer };
  default:
    return state;
  }
};

export default timer;
