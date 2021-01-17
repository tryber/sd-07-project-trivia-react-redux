import type from '../actions';

const SCORE_INITIAL_STATE = {
  score: 0,
  correctAnswers: 0,
};

const scoreReducer = (state = SCORE_INITIAL_STATE, action) => {
  switch (action.type) {
  case type.GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case type.UPDATE_CORRECT_COUNT:
    return {
      ...state,
      correctAnswers: state.correctAnswers + 1,
    };
  default:
    return state;
  }
};

export default scoreReducer;
