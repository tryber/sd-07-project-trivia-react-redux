import md5 from 'crypto-js/md5';
import { AVATAR, LOGIN, TOKEN, QUESTIONS } from './actionsTypes';

export const clickLogin = ({ email, name }) => ({
  type: LOGIN,
  payload: { email, name },
});

export const clickToken = (token) => ({
  type: TOKEN,
  token,
});

export const clickAvatar = (avatar) => ({
  type: AVATAR,
  avatar,
});

export const questionsGen = (questions, loading) => ({
  type: QUESTIONS,
  questions,
  loading,
});

export const fetchGravatar = (email) => {
  const hashEmail = md5(email).toString();
  const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => dispatch(clickAvatar(response.url)))
      .catch((error) => {
        console.log(error);
      });
  };
};
