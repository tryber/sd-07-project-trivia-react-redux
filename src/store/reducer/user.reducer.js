import { UPDATE_SCORE, QUERY_COUNT } from './user.action';

const INITIAL_STATE = {
  score: 0,
  queryCount: 0,
};

const QUERY_ADD = 1;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case QUERY_COUNT:
    return { ...state, queryCount: state.queryCount + QUERY_ADD };
  default:
    return state;
  }
};

export default userReducer;
