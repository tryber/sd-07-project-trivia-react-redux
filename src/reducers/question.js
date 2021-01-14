import { ADD_ANSWERS } from '../actions';

const INITIAL_STATE = {
  responses: {},
};

function question(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_ANSWERS:
    return {
      ...state,
      responses: { ...action.payload } };
  default:
    return state;
  }
}

export default question;
