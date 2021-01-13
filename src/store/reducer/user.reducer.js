import { UPDATE_SCORE, QUESTION_COUNT } from './user.action';

const INITIAL_STATE = {
  score: 0,
  questionCount: 0,
};

const QUESTION_ADD = 1;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case QUESTION_COUNT:
    return { ...state, questionCount: state.questionCount + QUESTION_ADD };
  default:
    return state;
  }
};

export default userReducer;
