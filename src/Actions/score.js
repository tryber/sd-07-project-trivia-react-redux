export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const updateScoreAction = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const resetScoreAction = () => ({
  type: RESET_SCORE,
});
