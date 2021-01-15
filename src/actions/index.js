export const LOGIN = 'LOGIN';
export const EMAIL = 'EMAIL';
export const TOKEN = 'TOKEN';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';
export const ALLPLAYER = 'ALLPLAYER';
export const GRAVATAR = 'GRAVATAR';

export const login = (name) => ({
  type: LOGIN, name,
});

export const userEmail = (email) => ({
  type: EMAIL, email,
});

export const scores = (score) => ({
  type: SCORE, score,
});

export const assertion = (assertions) => ({
  type: ASSERTIONS, assertions,
});

export const savePlayer = (rank) => ({
  type: ALLPLAYER, rank,
});

export const getGravatar = (gravatar) => ({
  type: GRAVATAR, gravatar,
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
