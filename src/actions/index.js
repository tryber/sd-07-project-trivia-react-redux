import { getQuestions } from '../service/apiTrivia';

export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SAVE_QUESTIONS = 'SET_QUESTIONS';
export const SET_STATE_PLAYER = 'SET_STATE_PLAYER';

export const setUserLogin = (name, email) => ({
  type: SET_USER_LOGIN,
  name,
  email,
});

const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const setStatePlayer = (statePlayer) => ({
  type: SET_STATE_PLAYER,
  statePlayer,
});

export const setQuestions = (token) => async (dispatch) => {
  const questions = await getQuestions(token);
  dispatch(saveQuestions(questions.results));
};
