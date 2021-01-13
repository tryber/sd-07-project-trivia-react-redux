import { questionsGetter } from '../../helper/trivia_request';

export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SET_ORDER = 'SET_ORDER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_FETCHING = 'SET_FETCHING';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

const setFetching = (isFetching) => ({
  type: SET_FETCHING,
  isFetching,
});

const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const getQuestions = (token) => async (dispatch) => {
  dispatch(setFetching(true));
  const questions = await questionsGetter(token);
  dispatch(saveQuestions(questions));
};

export const setOrder = (order) => ({
  type: SET_ORDER,
  order,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const resetScore = () => ({ type: RESET_SCORE });
