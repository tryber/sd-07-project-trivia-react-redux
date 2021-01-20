import getTriviaToken from '../../services/getTriviaToken';
import getGravatarImg from '../../services/getGravatarImg';
import getTriviaQuestions from '../../services/getTriviaQuestions';

export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const saveUserData = (data) => ({
  type: SAVE_USER_DATA,
  data,
});

export const login = (email, username) => async (dispatch) => {
  const token = await getTriviaToken();
  const gravatarImg = getGravatarImg(email);
  localStorage.setItem('token', token);
  dispatch(saveUserData({ email, username, token, gravatarImg }));
};

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const getQuestions = (token) => async (dispatch) => {
  const questions = await getTriviaQuestions(token);
  dispatch(saveQuestions(questions));
};

export const RESET_TIMER = 'RESET_TIMER';

export const resetTimerAction = (data) => ({
  type: RESET_TIMER,
  resetTimer: data,
});
