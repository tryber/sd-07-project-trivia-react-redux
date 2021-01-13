import {
  REQUEST_TOKEN,
  RECEIVE_TOKEN,
  FAILED_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  image: '',
  isFetchingToken: false,
  redirect: false,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isFetchingToken: true };
  case RECEIVE_TOKEN:
    return { ...state, ...action.payload, isFetchingToken: false, redirect: true };
  case FAILED_REQUEST:
    return { ...state, isFetchingToken: false, error: action.error };
  default:
    return state;
  }
}

export default user;
