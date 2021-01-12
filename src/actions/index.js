export const LOGIN = 'LOGIN';

export const login = (nome, email) => ({
  type: LOGIN,
  nome,
  email,
});
