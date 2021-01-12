import { GET_TOKEN, REQUEST_TOKEN, FAILED_REQUEST } from '../actions';

const initialState = {
  token: '',
  isFetching: false,
};

const token = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isFetching: true };
  case GET_TOKEN:
    return { ...state, token: action.tokenCode.token, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, token: action.tokenCode.token, isFetching: false };
  default:
    return state;
  }
};

export default token;
