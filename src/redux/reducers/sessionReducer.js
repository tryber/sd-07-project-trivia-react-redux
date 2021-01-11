import { LOG_IN } from '../actions';

const sessionInitialState = '';

function sessionReducer(state = sessionInitialState, action) {
  switch (action.type) {
  case LOG_IN:
    return action.payload;
  default:
    return state;
  }
}

export default sessionReducer;
