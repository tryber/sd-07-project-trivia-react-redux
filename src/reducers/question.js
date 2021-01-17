import { ADD_ANSWERS,
  ADD_QUESTIONS,
  ADD_CATEGORYS,
  ADD_TIME,
  ADD_RESET,
  ADD_STOP } from '../actions';

const INITIAL_STATE = {
  responses: {},
  resQuestion: '',
  categoryRes: '',
  timeEnd: true,
  reset: false,
  stop: false,
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
  case ADD_TIME:
    return {
      ...state,
      timeEnd: false };
  case ADD_RESET:
    return {
      ...state,
      reset: true };
  case ADD_STOP:
    return {
      ...state,
      stop: true };
  default:
    return state;
  }
}

export default question;
