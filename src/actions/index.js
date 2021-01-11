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
