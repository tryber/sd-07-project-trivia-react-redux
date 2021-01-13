export const GET_USER = 'GET_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const ADD_SCORE = 'ADD_SCORE';

export const getUser = (name, email) => ({
  type: GET_USER,
  name,
  email,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

async function fetchToken() {
  const responseAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await responseAPI.json();
  return token;
}

export const catchToken = () => async (dispatch) => {
  const response = await fetchToken();
  dispatch(getToken(response.token));
  localStorage.setItem('token', response.token);
};
