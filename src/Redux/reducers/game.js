import { SAVE_QUESTIONS, RESET_TIMER } from '../actions';

const INITIAL_STATE = { questions: [], resetTimer: false };

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case RESET_TIMER:
    return {
      ...state,
      resetTimer: action.resetTimer,
    };
  default:
    return state;
  }
}
