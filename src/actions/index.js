export const LOGIN = 'LOGIN';
export const REQUEST_TOKEN = 'TOKEN';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const login = (email) => ({
  type: LOGIN,
  email,
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

export const fetchToken = () => async (dispatch) => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  try {
    dispatch(requestToken);
    const response = await fetch(endPoint);
    const tokens = await response.json();
    dispatch(requestSucessToken(tokens));
  } catch (error) {
    dispatch(requestErrorToken(error));
  }
};
