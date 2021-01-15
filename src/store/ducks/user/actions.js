import userTypes from './types';

export const signIn = (info) => ({
  type: userTypes.SIGNIN,
  payload: info,
});

export const addScore = (score) => ({
  type: userTypes.ADD_SCORE,
  payload: score,
});
