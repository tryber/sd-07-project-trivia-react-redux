

export const GET_USER = 'GET_USER';

export const getUser = (name, email) => ({
  type: GET_USER,
  name,
  email
});
