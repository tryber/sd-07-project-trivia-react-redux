import {
  FAILED_REQUEST,
  RESULT_TRIVIA /* REQUEST_TRIVIA */,
} from '../actions/fetchTrivia';

const INITIAL_STATE = {
  trivia: {}, // loading: false,
};

export default function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    /* case REQUEST_TRIVIA:
    return { ...state.triviaReducer, loading: true }; */
    case RESULT_TRIVIA:
      console.log('triviareducer', {
        ...state.triviaReducer,
        trivia: action.payload,
        /* loading: false */
      });
      return {
        ...state.triviaReducer,
        trivia: action.payload,
        /* loading: false */
      };
    case FAILED_REQUEST:
      return console.log(action.payload);
    default:
      return state;
  }
}
