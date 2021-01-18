import {
  COUNT_DOWN,
  FREEZE_TIME,
  NEXT_QUESTION,
  RESET_TIMER,
  SAVE_QUESTIONS,
  START_TIME,
  FETICHING_QUESTIONS,
} from '../actions';

const PLAY_INITIAL_STATE = {
  questions: [],
  currentQuestion: {},
  indexQuestion: 0,
  status: '',
  timer: 30,
  setIntervalState: 0,
  isFetching: false,
};

const play = (state = PLAY_INITIAL_STATE, action) => {
  switch (action.type) {
  case FETICHING_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case SAVE_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      questions: action.questions,
      currentQuestion: action.questions[state.indexQuestion],
      status: action.time,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      indexQuestion: state.indexQuestion + 1,
      currentQuestion: state.questions[state.indexQuestion],
      timer: 30,
    };
  case START_TIME:
    return {
      ...state,
      setIntervalState: action.setIntervalState,
    };
  case RESET_TIMER:
    return {
      ...state,
      currentQuestion: state.questions[state.indexQuestion],
      timer: 30,
    };
  case COUNT_DOWN:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case FREEZE_TIME:
    return {
      ...state,
      timer: state.timer,
    };
  default:
    return state;
  }
};

export default play;
