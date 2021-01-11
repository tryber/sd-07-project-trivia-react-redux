import types from '.';

const getEmail = (email) => ({
  type: types.USER_EMAIL, email,
});

export default getEmail;
