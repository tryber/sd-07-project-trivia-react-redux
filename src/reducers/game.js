import { REQUEST_TRIVIA_SUCCESS, REQUEST_TRIVIA_API } from '../action';

const INITIAL_STATE = {
  apiData: [],
  isFetchingQuestions: true,
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TRIVIA_API:
    return { ...state, isFetchingQuestions: true };
  case REQUEST_TRIVIA_SUCCESS:
    return { ...state, apiData: { ...action.value }, isFetchingQuestions: false };
  default:
    return state;
  }
}
