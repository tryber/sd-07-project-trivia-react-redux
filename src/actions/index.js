import { getToken } from '../services/triviaAPI';

/* export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'; */
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_FAIL = 'REQUEST_TOKEN_FAIL';

/* export const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token,
}); */

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestTokenSuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token,
});

/* const requestTokenFail = () => ({
  type: REQUEST_TOKEN_FAIL,
}) */

export function fetchTokenTrivia() {
  return async (dispatch) => {
    dispatch(requestToken());
    const { token } = await getToken();
    dispatch(requestTokenSuccess(token));
  };
}
