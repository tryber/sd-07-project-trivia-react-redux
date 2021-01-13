import { FAILED_REQUEST, RESULT_TOKEN /* REQUEST_TOKEN */ } from '../actions/fetchToken';

const INITIAL_STATE = {
  token: '', // loading: false,
};

export default function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  /* case REQUEST_TOKEN:
    return { ...state.tokenReducer, loading: true }; */
  case RESULT_TOKEN:
    console.log( { ...state.tokenReducer, token: action.payload })
    return { ...state.tokenReducer, token: action.payload };
  case FAILED_REQUEST:
    return console.log(action.payload);
  default:
    return state;
  }
}
