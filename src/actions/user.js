import types from '.';

export const getEmail = (email) => ({
  type: types.USER_EMAIL, email,
});
