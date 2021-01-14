import { ADD_ANSWERS, ADD_QUESTIONS, ADD_CATEGORYS } from '../actions';

const INITIAL_STATE = {
  responses: {},
  resQuestion: '',
  categoryRes: '',
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
  case ADD_CATEGORYS:
    return {
      ...state,
      categoryRes: action.category };
  default:
    return state;
  }
}

export default question;
