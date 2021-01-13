import { ADD_SCORE } from '../Actions';

const INITIAL_STATE = {
  score: 0,
};

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return { ...state, score: action.score };
  default:
    return state;
  }
};

export default scoreReducer;
