import { COUNT_DOWN, FREEZE_TIME, NEXT_QUESTION, RESET_TIMER, SAVE_QUESTIONS } from '../actions';

const PLAY_INITIAL_STATE = {
  questions: [],
  currentQuestion: {},
  indexQuestion: 0,
  status: '',
  timer: 30,
};

const play = (state = PLAY_INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return ({
      ...state,
      questions: action.questions,
      currentQuestion: action.questions[state.indexQuestion],
      indexQuestion: state.indexQuestion + 1,
      status: action.time,
    });
  case NEXT_QUESTION:
    return ({
      ...state,
      currentQuestion: state.questions[state.indexQuestion],
      indexQuestion: state.indexQuestion + 1,
      timer: 30,
    });
  case RESET_TIMER:
    return ({
      ...state,
      currentQuestion: state.questions[state.indexQuestion],
      indexQuestion: state.indexQuestion + 1,
      timer: 30,
    });
  case COUNT_DOWN:
    return ({
      ...state,
      timer: state.timer - 1,
    });
    case FREEZE_TIME:
      return ({
        ...state,
        timer: 0,
      })
  default:
    return state;
  }
};

export default play;
