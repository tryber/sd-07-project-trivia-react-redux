import md5 from 'crypto-js/md5';
import { LOGIN, TOKEN } from './actionsTypes';

export const clickLogin = ({ email, name }) => ({
  type: LOGIN,
  payload: { email, name },
});

export const clickToken = (token) => ({
  type: TOKEN,
  token,
});

export const fetchToken = () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((obj) => {
        const { token } = obj;
        // ENVIAR O TOKEN PARA O LOCALSTORAGE
        localStorage.setItem('token', token);
        return dispatch(clickToken(token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchGravatar = (email) => {
  const hashEmail = md5(email);
  const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
  return (/* dispatch */) => {
    fetch(URL)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        /*         return dispatch(clickToken(token)); */
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
