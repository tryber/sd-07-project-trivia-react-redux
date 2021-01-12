export const LOGIN = 'LOGIN';
export const EMAIL = 'EMAIL';
export const TOKEN = 'TOKEN';

export const login = (name) => ({
  type: LOGIN, name,
});

export const userEmail = (email) => ({
  type: EMAIL, email,
});

export const getToken = () => function api(dispatch) {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      const { token } = json;
      localStorage.setItem('token', token);
      dispatch({ type: TOKEN, token });
    })
    .catch((error) => console.log(error));
};

// export const saveState = (key, state) => function teste(dispatch) {
//   const serializedState = JSON.stringify(state);
//   dispatch(localStorage.setItem([key], serializedState));
// };
