import triviaTokenTypes from './types';

const request = () => ({
  type: triviaTokenTypes.REQUEST,
});

const receiveSuccess = (token) => ({
  type: triviaTokenTypes.RECEIVE_SUCCESS,
  payload: token,
});

const receiveFail = (error) => ({
  type: triviaTokenTypes.RECEIVE_FAIL,
  payload: error,
});

export default {
  request,
  receiveSuccess,
  receiveFail,
};
