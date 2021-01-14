import { REQUEST_TOKEN, REQUEST_TOKEN_SUCCESS } from '../actions/fetchTokenTrivia';

const INITIAL_STATE = {
  isFetching: false,
};

const receiveToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.token,
      isFetching: false,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  default:
    return state;
  }
};

export default receiveToken;
