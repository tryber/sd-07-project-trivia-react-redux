import { QUESTIONS, TIMER, SECONDS } from '../actions/actionsTypes';

const initialState = {
  questions: [],
  timer: false,
  seconds: 30,
};

const questionsGen = (state = initialState, action) => {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  case TIMER:
    return { ...state, timer: action.timer };
  case SECONDS:
    return { ...state, seconds: action.seconds };
  default:
    return state;
  }
};

export default questionsGen;
