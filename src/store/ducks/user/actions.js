import userTypes from './types';

const signIn = (info) => ({
  type: userTypes.SIGNIN,
  payload: info,
});

export default signIn;
