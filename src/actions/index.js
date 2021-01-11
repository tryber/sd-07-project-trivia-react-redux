export const LOGIN = 'LOGIN';
export const EMAIL = 'EMAIL';

export const login = (name) => ({
  type: LOGIN, name,
});

export const userEmail = (email) => ({
  type: EMAIL, email,
});
