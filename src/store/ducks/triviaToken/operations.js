import actions from './actions';

const ENDPOINT_GET_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export default function fetchTriviaToken() {
  return async (dispatch) => {
    dispatch(actions.request());
    try {
      const response = await fetch(ENDPOINT_GET_TOKEN);
      const result = await response.json();
      dispatch(actions.receiveSuccess(result.token));
    } catch (error) {
      dispatch(actions.receiveFail(error));
    }
  };
}
