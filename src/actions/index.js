import md5 from 'crypto-js/md5';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const requestToken = () => ({ type: REQUEST_TOKEN });
const failedRequest = (error) => ({ type: FAILED_REQUEST, error });
const receiveToken = (payload) => ({ type: RECEIVE_TOKEN, payload });

export const login = ({ name, email }) => async (dispatch) => {
  try {
    dispatch(requestToken());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    const { token } = json;
    const hashGravatar = md5(email);
    const image = `https://www.gravatar.com/avatar/${hashGravatar}`;
    const state = JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      } });
    console.log(state);
    dispatch(receiveToken({ name, email, token, image }));
    localStorage.setItem('token', token);
    localStorage.setItem('state', state);
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
