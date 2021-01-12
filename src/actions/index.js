let tokenUsed = '';

export const getToken = (token) => ({
  type: 'fetchSucessToken',
  token,
});

export const getQuestions = (question) => ({
  type: 'fetchSucessQuestion',
  question,
});

export const fetchToken = () => async (dispatch) => {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenResponse = await request.json();
    tokenUsed = tokenResponse;
    console.log(tokenUsed);
    dispatch(getToken(tokenUsed));
};

export const fetchQuestions = () => async (dispatch) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenUsed}`);
  const questionResponse = await request.json();
  dispatch(getQuestions(questionResponse));
};
