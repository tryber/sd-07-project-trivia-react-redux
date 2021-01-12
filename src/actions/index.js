export const LOGIN = 'LOGIN';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const tokenRequest = (token) => ({ type: TOKEN_REQUEST, token });

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({ type: REQUEST_STARTED });

export const REQUEST_FAIL = 'REQUEST_FAIL';
export const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export function fetchToken() {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await fetchAPI.json();
      dispatch(tokenRequest(token));
    } catch (erro) {
      dispatch(requestFail());
    }
  };
}
export const login = (payload) => ({
  type: LOGIN,
  payload,
});
