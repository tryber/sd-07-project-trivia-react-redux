import { TOKEN, QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: {},
  questions: {},
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default game;
