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

export const requestTriviaApi = (value) => (
  {
    type: REQUEST_TRIVIA_API,
    value,
  });

export function sucessTriviaApi(value) {
  return {
    type: REQUEST_TRIVIA_SUCCESS,
    value,
  };
}

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestToken());
    const jsonData = await api();
    return dispatch(requestApiSuccess(jsonData));
  };
}

export function getTriviaQuestions(token) {
  return async (dispatch) => {
    dispatch(requestTriviaApi(token));
    const jsonData = await fetchingTrivia(token);
    return dispatch(sucessTriviaApi(jsonData));
  };
}
