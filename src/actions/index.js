export const LOGIN = 'LOGIN';
export const EMAIL = 'EMAIL';
export const TOKEN = 'TOKEN';

export const login = (name) => ({
  type: LOGIN, name,
});

export const userEmail = (email) => ({
  type: EMAIL, email,
});

export const apiToken = (token) => ({
  type: TOKEN, token,
});

export const getToken = () => {
  return (dispatch, getState) => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => dispatch(apiToken(json.token)))
      .catch((error) => console.log(error));
  };
};
