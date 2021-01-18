import { ADD_ANSWERS,
  ADD_QUESTIONS,
  ADD_CATEGORYS,
  ADD_TIME,
  ADD_RESET,
  ADD_STOP,
  ADD_TIMEVALUE } from '../actions';

const INITIAL_STATE = {
  responses: {},
  resQuestion: '',
  categoryRes: '',
  timeEnd: true,
  reset: false,
  stop: false,
  valueTime: 0,
};

function question(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_ANSWERS:
    return {
      ...state,
      responses: { ...action.payload },
    };
  case ADD_QUESTIONS:
    return {
      ...state,
      resQuestion: action.question,
    };
  case ADD_CATEGORYS:
    return {
      ...state,
      categoryRes: action.category,
    };
  case ADD_TIME:
    return {
      ...state,
      timeEnd: false,
      reset: false,
    };
  case ADD_RESET:
    return {
      ...state,
      reset: true,
      stop: false,
      timeEnd: true,
    };
  case ADD_STOP:
    return {
      ...state,
      stop: true,
      reset: false,
      timeEnd: true,
    };
  case ADD_TIMEVALUE:
    return {
      ...state,
      valueTime: action.time,
    };
  default:
    return state;
  }
}

export default question;
