export const UPDATE_SCORE = 'UPDATE_SCORE';
export const QUESTION_COUNT = 'QUESTION_COUNT';

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});

export const questionCount = () => ({
  type: QUESTION_COUNT,
});
