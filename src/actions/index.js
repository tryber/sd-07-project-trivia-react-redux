export const SET_USER_LOGIN = 'SET_USER_LOGIN';

export const setUserLogin = (name, email) => ({
  type: SET_USER_LOGIN,
  name,
  email,
});
