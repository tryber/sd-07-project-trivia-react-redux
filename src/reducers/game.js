import { REQUEST_TRIVIA_SUCCESS, REQUEST_TRIVIA_API } from '../action';

const INITIAL_STATE = {
  apiData: {},
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TRIVIA_API:
    return { ...state,
      isFetching: true };
  case REQUEST_TRIVIA_SUCCESS:
    return {
      ...state,
      apiData: { ...state.apiData, ...action.apiData },
    };
  default:
    return state;
  }
}
