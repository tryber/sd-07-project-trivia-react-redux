import { ADD_ANSWERS, ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  responses: {},
  resQuestion: '',
};

function question(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_ANSWERS:
    return {
      ...state,
      responses: { ...action.payload } };
  case ADD_QUESTIONS:
    return {
      ...state,
      resQuestion: action.question };
  default:
    return state;
  }
}

export default question;
