import { fetchQuestionNAnswer } from '../../../services';
import GameTypes from './types';

export const getQuestion = (questions) => (
  { type: GameTypes.GET_QUESTION, questions });

export function getQuestionData() {
  const token = localStorage.getItem('token');
  return async (dispatch) => {
    const response = await fetchQuestionNAnswer(token);
    const questions = await response.results;
    dispatch(getQuestion(questions));
  };
}
