let tokenUsed = '';

export const getToken = (token) => ({
  type: 'fetchSucessToken',
  tokenData: token,
});

export const getQuestions = (questions) => ({
  type: 'fetchSucessQuestion',
  questions,
});

export const fetchToken = () => async (dispatch) => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const tokenResponse = await request.json();
  tokenUsed = tokenResponse.token;
  dispatch(getToken(tokenUsed));
};

export const fetchQuestions = () => async (dispatch) => {
  console.log(tokenUsed);
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenUsed}`);
  const questionResponse = await request.json();
  dispatch(getQuestions(questionResponse.results));
};
