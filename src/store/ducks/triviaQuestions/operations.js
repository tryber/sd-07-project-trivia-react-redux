import actions from './actions';
import { fetchTriviaToken } from '../triviaToken';

const ENDPOINT_GET_QUESTIONS = 'https://opentdb.com/api.php?amount=5&token=';

export default function fetchTriviaQuestions() {
  return async (dispatch, getState) => {
    dispatch(actions.request());
    try {
      let { token } = getState().triviaToken;
      let response = await fetch(`${ENDPOINT_GET_QUESTIONS}${token}`);
      let result = await response.json();
      if (result.response_code !== 0) {
        await dispatch(fetchTriviaToken());
        token = getState().triviaToken.token;
        response = await fetch(`${ENDPOINT_GET_QUESTIONS}${token}`);
        result = await response.json();
      }
      dispatch(actions.receiveSuccess(result.results));
    } catch (error) {
      dispatch(actions.receiveFail(error));
    }
  };
}
