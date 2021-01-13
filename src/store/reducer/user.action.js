export const UPDATE_SCORE = 'UPDATE_SCORE';
export const QUERY_COUNT = 'QUERY_COUNT';

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});

export const queryCount = () => ({
  type: QUERY_COUNT,
});
