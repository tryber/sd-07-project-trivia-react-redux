import { TOKEN } from '../actions';

const INITIAL_STATE = {
  payload: {},
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      payload: action.payload,
    };
  default:
    return state;
  }
};

export default token;
