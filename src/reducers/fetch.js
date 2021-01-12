import { TOKEN_REQUEST, REQUEST_STARTED, REQUEST_FAIL } from '../actions/index';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST:
    return {
      ...state, token: action.token.token, isLoading: false,
    };
  case REQUEST_STARTED:
    return { ...state, isLoading: true };
  case REQUEST_FAIL:
    return { ...state, isLoading: false };
  default:
    return state;
  }
};

export default user;
