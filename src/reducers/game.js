import { REQUEST_FAIL, REQUEST_SUCESS } from '../constants';

const INITIAL_STATE = {
  QuestionsList: [],
};

const game = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case REQUEST_SUCESS:
    return { QuestionsList: action.payload };
  case REQUEST_FAIL:
    return { ...state, error: action.payload.message };
  default:
    return state;
  }
};

export default game;
