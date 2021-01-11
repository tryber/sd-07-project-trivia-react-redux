const SIGN_IN = 'SIGN_IN';

export const signIn = (name, email) => ({
  type: SIGN_IN,
  name,
  email,
});

export const singout = () => ({
  type: 'teste',
});
