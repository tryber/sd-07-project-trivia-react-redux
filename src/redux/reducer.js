import { REQUEST_QUESTION, REQUEST_SUCCESS } from './actions';

const INITIAL_STATE = {
  loading: true,
  questions: {},
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTION:
    return { ...state, loading: action.loading };
  case REQUEST_SUCCESS:
    return { ...state, loading: action.loading, questions: action.payload };
  default:
    return state;
  }
}

export default reducer;
