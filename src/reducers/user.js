import { LOGIN, REQUEST_TOKEN, REQUEST_API_SUCCESS } from '../action/index';

const INITIAL_STATE = {
  user: [],
  apiToken: [],
  isFetching: true,
};

export default function userReducer(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case LOGIN:
    return ({
      ...state, user: [...state.user, action.value],
    });
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
