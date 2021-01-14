import { SAVE_QUESTIONS } from '../actions';

const PLAY_INITIAL_STATE = {
  questions: [],
  status: '',
};

const play = (state = PLAY_INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return ({
      ...state,
      questions: action.questions,
      status: action.time,
    });
  default:
    return state;
  }
};

export default play;
