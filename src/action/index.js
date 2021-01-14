import api from '../services/api';

export const LOGIN = 'LOGIN';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const loginAction = (value) => ({
  type: LOGIN,
  value,
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
