import md5 from 'crypto-js/md5';

export const login = (email, userName) => ({
  type: 'LOGIN',
  payload: { email, userName },
});

export const getApiTrivia = () => ({});

export const saveAvatar = (data) => ({
  type: 'SAVE_AVATAR',
  payload: data,
});

export const getUserAvatar = (email, userName) => async (dispatch) => {
  console.log(email);
  email = email.trim();
  email = email.toLowerCase();
  const emailHash = md5(email);
  const response = await fetch(`https://www.gravatar.com/avatar/${emailHash}`);
  dispatch(saveAvatar(response.url));
  dispatch(login(email, userName));
};
