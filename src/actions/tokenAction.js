import { getToken } from '../services/api';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export const tokenRequest = () => ({
  type: TOKEN_REQUEST,
});

export const tokenSuccess = (token) => ({
  type: TOKEN_SUCCESS,
  token,
});

export const tokenFailure = (error) => ({
  type: TOKEN_FAILURE,
  error,
});

export const getTokenAction = () => {
  return (dispatch) => {
    dispatch(tokenRequest());
    return getToken()
      .then((response) => {
        localStorage.setItem('token', response);
        dispatch(tokenSuccess(response));
      })
      .catch((error) => dispatch(tokenFailure(error)));
  };
};
