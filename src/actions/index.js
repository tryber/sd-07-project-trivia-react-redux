export const fetchQuestions = (result) => ({
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
  dispatch(tokenAPI(data.token));
};

export const getQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  const result = data.results;
  dispatch(fetchQuestions(result));
};
