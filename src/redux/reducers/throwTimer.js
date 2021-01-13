import { THROW_TIME } from '../actions';

const sessionInitialState = '';

function throwTimer(state = sessionInitialState, action) {
  switch (action.type) {
  case THROW_TIME:
    return action.payload;
  default:
    return state;
  }
}

export default throwTimer;
