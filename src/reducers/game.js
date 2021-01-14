import { REQUEST_FAIL, REQUEST_SUCESS, UPDATE_TIME } from '../constants';

const INITIAL_STATE = {
  QuestionsList: [],
  time: 0,
};

const game = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case REQUEST_SUCESS:
    return { QuestionsList: action.payload };
  case REQUEST_FAIL:
    return { ...state, error: action.payload.message };
  case UPDATE_TIME:
    return { ...state, time: action.payload };
  default:
    return state;
  }
};

export default game;
