import { getQuestions } from '../service/apiTrivia';

export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SAVE_QUESTIONS = 'SET_QUESTIONS';

export const setUserLogin = (name, email) => ({
  type: SET_USER_LOGIN,
  name,
  email,
});

const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const setQuestions = (token) => async (dispatch) => {
  const questions = await getQuestions(token);
  console.log(questions);
  dispatch(saveQuestions(questions.results));
};
