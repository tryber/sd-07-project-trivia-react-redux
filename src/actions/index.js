export const LOGIN = 'LOGIN';
export const REQUEST_TOKEN = 'TOKEN';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const login = (email, name) => ({
  type: LOGIN,
  email,
  name,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestSucessToken = (token) => ({
  type: SUCCESS,
  token,
});

export const requestErrorToken = (error) => ({
  type: ERROR,
  error,
});

export const requestQuestions = () => ({
  type: 'REQUEST_QUESTIONS',
});

export const requestSucessQuestion = (questions, hash) => ({
  type: 'SUCCESS',
  questions,
  hash,
});

export const requestErrorQuestion = (error) => ({
  type: 'ERROR',
  error,
});

export const updateScoreAction = (newAssertions, newScore) => ({
  type: 'UPDATE_SCORE',
  newAssertions,
  newScore,
});

export const hashAction = (hash) => ({
  type: 'HASH_ACTION',
  hash,
});

export const fetchToken = () => async (dispatch) => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  try {
    dispatch(requestToken);
    const response = await fetch(endPoint);
    const responseToken = await response.json();
    dispatch(requestSucessToken(responseToken.token));
  } catch (error) {
    dispatch(requestErrorToken(error));
  }
};
