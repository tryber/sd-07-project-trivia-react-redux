import { UPDATE_SCORE, QUESTION_COUNT, RESET_QUESTION_COUNT } from './user.action';

const INITIAL_STATE = {
  score: 0,
  questionCount: 0,
};

const QUESTION_ADD = 1;
const QUESTION_RESET = 5;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case QUESTION_COUNT:
    return { ...state, questionCount: state.questionCount + QUESTION_ADD };
  case RESET_QUESTION_COUNT:
    return { ...state, questionCount: state.questionCount - QUESTION_RESET };
  default:
    return state;
  }
};

export default userReducer;
