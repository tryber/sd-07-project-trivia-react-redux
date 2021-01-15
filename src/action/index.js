import getGravatarImg from '../services/getGravatarImg';
import getTriviaQuestions from '../services/getTriviaQuestions';
import getTriviaToken from '../services/getTriviaToken';

export const LOGIN = 'LOGIN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const REQUEST_TRIVIA_API = 'REQUEST_TRIVIA_API';
export const REQUEST_TRIVIA_SUCCESS = 'REQUEST_TRIVIA_SUCCESS';

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const saveUserData = (email, username, token, gravatarImg) => ({
  type: SAVE_USER_DATA,
  data: {
    email,
    username,
    token,
    gravatarImg,
  },
});

export const login = (email, username) => async (dispatch) => {
  const token = await getTriviaToken();
  const gravatarImg = getGravatarImg(email);
  dispatch(saveUserData(email, username, token, gravatarImg));
};

export const getQuestions = (token) => async (dispatch) => {
  const questions = await getTriviaQuestions(token);
  dispatch(saveQuestions(questions));
};
