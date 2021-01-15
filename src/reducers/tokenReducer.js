import { FAILED_REQUEST, RESULT_TOKEN, REQUEST_TOKEN } from '../actions/fetchToken';

const INITIAL_STATE = {
  token: '',
  loadingToken: false,
};

export default function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, loadingToken: true };
  case RESULT_TOKEN:
    return { ...state.tokenReducer, token: action.payload, loadingToken: false };
  case FAILED_REQUEST:
    return console.log(action.payload);
  default:
    return state;
  }
}
