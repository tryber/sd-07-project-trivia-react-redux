export const getQuestions = (result) => ({
  type: 'questions',
  payload: result,
});

export const tokenAPI = (dataToken) => ({
  type: 'token',
  payload: dataToken,
});

export const getAPIToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const token = data.token;

  dispatch(tokenAPI(token));
};

export const getQuestions = () => async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  const result = data.results;

  dispatch(getQuestions(result));
}
