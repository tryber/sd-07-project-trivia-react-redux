import { THROW_TIME } from '../actions';

const initialState = 30;

function throwTimer(state = initialState, action) {
  switch (action.type) {
  case THROW_TIME:
    return action.payload;
  default:
    return state;
  }
}

export default throwTimer;
