export const LOGIN = 'LOGIN';
export const REQUEST_TOKEN = 'TOKEN';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTION';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const QUESTIONS_ERROR = 'QUESTIONS_ERROR';

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
  type: REQUEST_QUESTIONS,
});

export const requestSuccessQuestions = (questions) => ({
  type: QUESTIONS_SUCCESS,
  questions,
});

export const requestErrorQuestions = (error) => ({
  type: QUESTIONS_ERROR,
  error,
});

export const fetchToken = () => async (dispatch) => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  try {
    dispatch(requestToken);
    const response = await fetch(endPoint);
    const tokens = await response.json();
    dispatch(requestSucessToken(tokens.token));
  } catch (error) {
    dispatch(requestErrorToken(error));
  }
};

export const apiQuestions = (token) => async (dispatch) => {
  try {
    dispatch(requestQuestions);
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token-$${token}`);
    const questions = await request.json();
    dispatch(requestSuccessQuestions(questions));
  } catch (error) {
    dispatch(requestErrorQuestions(error));
  }
};
