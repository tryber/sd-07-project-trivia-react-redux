import { SAVE_QUESTIONS, SAVE_GAME_DATA } from '../actions';

const INITIAL_STATE = {
  questions: [],
  score: 0,
  assertions: 0,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case SAVE_GAME_DATA:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}
