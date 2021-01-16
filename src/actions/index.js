import md5 from 'crypto-js/md5';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_ANSWERS = 'ADD_ANSWERS';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_CATEGORYS = 'ADD_CATEGORYS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

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
    dispatch(receiveToken({ name, email, token, image }));
    localStorage.setItem('token', token);
    localStorage.setItem('state', state);
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const resCategoryAction = (category) => ({ type: ADD_CATEGORYS, category });

export const resQuestionAction = (question) => ({ type: ADD_QUESTIONS, question });

export const questionUpdate = (json) => ({ type: ADD_ANSWERS, payload: json });

export function fetchQuestionAnswers(tok) {
  return async (dispatch) => {
    dispatch(questionUpdate());
    // const token = localStorage.getItem('token');
    const questionResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tok}`);
    const questionJson = await questionResponse.json();

    return dispatch(questionUpdate(questionJson.results));
  };
}

export const updateScore = (value) => ({ type: UPDATE_SCORE, value });
