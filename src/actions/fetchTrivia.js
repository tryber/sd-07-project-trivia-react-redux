import { fetchTriviaAPI } from '../services/api';

export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const RESULT_TRIVIA = 'RESULT_TRIVIA';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const requestTrivia = () => (
  { type: REQUEST_TRIVIA }
);

const resultTrivia = (payload) => (
  { type: RESULT_TRIVIA, payload }
);

const failedRequest = (error) => (
  { type: FAILED_REQUEST, payload: error }
);

export default function fetchTrivia(token) {
  return async (dispatch) => {
    dispatch(requestTrivia());
    try {
      const trivia = await fetchTriviaAPI(token);
      dispatch(resultTrivia(trivia));
    } catch (err) { dispatch(failedRequest(err)); }
  };
}
