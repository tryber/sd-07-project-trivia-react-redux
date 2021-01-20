import md5 from 'crypto-js/md5';

export const login = (email, userName) => ({
  type: 'LOGIN',
  payload: { email, userName },
});

export const saveApiTrivia = (perguntas) => ({
  type: 'SAVE_TRIVIA',
  payload: perguntas,
});

export const saveAvatar = (data) => ({
  type: 'SAVE_AVATAR',
  payload: data,
});

export const nextTrivia = () => ({
  type: 'NEXT_TRIVIA',
});

export const getApiTrivia = () => async (dispatch) => {
  const localStorageTrivia = localStorage.getItem('token');
  const endpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${localStorageTrivia}`);
  const data = await endpoint.json();
  dispatch(saveApiTrivia(data.results));
};

export const getToken = () => async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

export const getUserAvatar = (email, userName) => async (dispatch) => {
  console.log(email);
  email = email.trim();
  email = email.toLowerCase();
  const emailHash = md5(email);
  const response = await fetch(`https://www.gravatar.com/avatar/${emailHash}`);
  dispatch(saveAvatar(response.url));
  dispatch(login(email, userName));
};
