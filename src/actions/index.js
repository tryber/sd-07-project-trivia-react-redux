const USER_EMAIL = 'USER_EMAIL';

export default { USER_EMAIL };

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
});
