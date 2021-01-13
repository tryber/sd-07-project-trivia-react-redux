export const LOGIN_EMAIL = 'LOGIN_EMAIL';

export const login = (name, email) => (
  {
    type: LOGIN_EMAIL,
    user: {
      name,
      email,
    },
  }
);
