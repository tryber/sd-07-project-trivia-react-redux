import { TOKEN_FAILURE, TOKEN_REQUEST, TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = {
  value: localStorage.getItem('token') || '',
  isFetchingToken: false,
  error: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  if (action.type === TOKEN_SUCCESS) {
    return {
      ...state,
      value: action.token,
      isFetchingToken: false,
    };
  }
  if (action.type === TOKEN_FAILURE) {
    return {
      ...state,
      error: action.error,
      isFetchingToken: false,
    };
  }
  if (action.type === TOKEN_REQUEST) {
    return {
      ...state,
      isFetchingToken: true,
    };
  }
  return state;
}

export default tokenReducer;
