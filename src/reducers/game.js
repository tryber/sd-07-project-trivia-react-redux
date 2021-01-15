import { REQUEST_FAIL, REQUEST_SUCESS, UPDATE_SCORE } from '../constants';

const INITIAL_STATE = {
  QuestionsList: [],
  score: 0,
  assertions: 0,
};

const game = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case REQUEST_SUCESS:
    return { ...state, QuestionsList: action.payload };
  case REQUEST_FAIL:
    return { ...state, error: action.payload.message };
  case UPDATE_SCORE:
    return { ...state, score: action.payload, assertions: Number(state.assertions) + 1 };
  default:
    return state;
  }
};

export default game;
