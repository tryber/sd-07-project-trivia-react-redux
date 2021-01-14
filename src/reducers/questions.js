import { QUESTIONS, TIMER } from '../actions/actionsTypes';

const initialState = {
  questions: [],
  timer: false,
};

const questionsGen = (state = initialState, action) => {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  case TIMER:
    return { ...state, timer: action.timer };
  default:
    return state;
  }
};

export default questionsGen;
