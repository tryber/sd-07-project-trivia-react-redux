export const login = (email, userName) => ({
  type: 'LOGIN',
  payload: { email, userName },
});

export const getApiTrivia = () => ({});
