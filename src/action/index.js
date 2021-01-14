import fetchingTrivia from '../services/fetchingTrivia';
import api from '../services/api';

export const LOGIN = 'LOGIN';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TRIVIA_API = 'REQUEST_TRIVIA_API';
export const REQUEST_TRIVIA_SUCCESS = 'REQUEST_TRIVIA_SUCCESS';

export const loginAction = (email, username) => ({
  type: LOGIN,
  email,
  username,
});

export const requestToken = (value) => ({
  type: REQUEST_TOKEN,
  value,
});

export const requestApiSuccess = (value) => ({
  type: REQUEST_API_SUCCESS,
  value,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestToken());
    const jsonData = await api();
    console.log(jsonData);
    return dispatch(requestApiSuccess(jsonData));
  };
}

export const requestTriviaApi = () => ({ type: REQUEST_TRIVIA_API });
export function sucessTriviaApi(apiData) {
  return {
    type: REQUEST_TRIVIA_SUCCESS,
    apiData,
  };
}

export function getTriviaQuestions(token) {
  return async (dispatch) => {
    console.log('meu token', token);
    dispatch(requestTriviaApi);
    const triviaResult = await fetchingTrivia(token);
    return dispatch(sucessTriviaApi(triviaResult));
  };
}
