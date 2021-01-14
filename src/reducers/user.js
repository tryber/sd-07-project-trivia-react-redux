import { LOGIN, REQUEST_TOKEN,
  REQUEST_API_SUCCESS } from '../action/index';

const INITIAL_STATE = {
  user: {},
  apiToken: {},
  isFetching: true,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state, user: { email: action.email, username: action.username },
    };
  // estou fazendo a requisição, espere...
  case REQUEST_TOKEN:
    return { ...state,
      isFetching: true };
  // terminei, receba o objeto.
  case REQUEST_API_SUCCESS:
    return { ...state, apiToken: { ...action.value }, isFetching: false };
  default:
    return state;
  }
}
