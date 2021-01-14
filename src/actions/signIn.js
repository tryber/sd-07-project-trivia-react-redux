const signIn = (name, email, score) => ({
  type: 'ADD_PLAYER',
  name,
  email,
  score,
});

export default signIn;
