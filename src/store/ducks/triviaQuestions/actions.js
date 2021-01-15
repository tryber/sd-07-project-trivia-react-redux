import triviaQuestionsTypes from './types';

const request = () => ({
  type: triviaQuestionsTypes.REQUEST,
});

const receiveSuccess = (questions) => ({
  type: triviaQuestionsTypes.RECEIVE_SUCCESS,
  payload: questions,
});

const receiveFail = (error) => ({
  type: triviaQuestionsTypes.RECEIVE_FAIL,
  payload: error,
});

export default {
  request,
  receiveSuccess,
  receiveFail,
};
