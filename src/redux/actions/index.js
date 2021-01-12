export const LOGIN_EMAIL = 'LOGIN_EMAIL';

export const login = (user) => (
  {
    type: LOGIN_EMAIL,
    user,
  }
);
