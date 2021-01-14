import { SAVE_QUESTIONS } from '../actions';

const PLAY_INITIAL_STATE = {
  questions: [],
  currentQuestion: {},
  indexQuestion: 0,
  status: '',
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
  default:
    return state;
  }
};

export default play;
