import {
  requestQuestions,
  listQuestions,
  failedRequest,
} from '../store/reducer/trivia.action';

export const getToken = async () => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  } catch (err) {
    return 'erro';
  }
};

export const getTriviaQuestions = (token) => {
  const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      dispatch(listQuestions(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
};
