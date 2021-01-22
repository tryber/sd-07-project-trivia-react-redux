import getTriviaToken from '../../services/getTriviaToken';
import getGravatarImg from '../../services/getGravatarImg';
import getTriviaQuestions from '../../services/getTriviaQuestions';

export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const SAVE_GAME_DATA = 'SAVE_GAME_DATA';
export const AUTHENTICATION = 'AUTHENTICATION';

export const saveUserData = (data) => ({
  type: SAVE_USER_DATA,
  data,
});

export const authentication = (auth) => ({
  type: AUTHENTICATION,
  auth,
});

export const login = (email, username) => async (dispatch) => {
  const token = await getTriviaToken();
  const gravatarImg = getGravatarImg(email);
  localStorage.setItem('token', token);
  dispatch(saveUserData({ email, username, token, gravatarImg }));
  dispatch(authentication(true));
};

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const getQuestions = (token) => async (dispatch) => {
  const questions = await getTriviaQuestions(token);
  dispatch(saveQuestions(questions));
};

export const saveGameData = (score, assertions) => ({
  type: SAVE_GAME_DATA,
  score,
  assertions,
});
