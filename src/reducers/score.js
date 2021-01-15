import type from '../actions';

const SCORE_INITIAL_STATE = {
  score: 0,
};

const scoreReducer = (state = SCORE_INITIAL_STATE, action) => {
  switch (action.type) {
  case type.GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default scoreReducer;
