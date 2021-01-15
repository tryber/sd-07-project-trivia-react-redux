import md5 from 'crypto-js/md5';
import { AVATAR, LOGIN, QUESTIONS, TIMER, SECONDS } from './actionsTypes';

export const clickLogin = ({ email, name }) => ({
  type: LOGIN,
  payload: { email, name },
});

export const clickAvatar = (avatar) => ({
  type: AVATAR,
  avatar,
});

export const questionsGen = (questions) => ({
  type: QUESTIONS,
  questions,
});

export const finalTime = (timer) => ({
  type: TIMER,
  timer,
});

export const secondsLeft = (seconds) => ({
  type: SECONDS,
  seconds,
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
