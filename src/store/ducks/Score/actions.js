import TaskTypes from './types';

const { ADD_SCORE, FAILED_SCORE } = TaskTypes;

const addScore = (score) => ({ type: ADD_SCORE, score });
const addScoreFailed = (error) => ({ type: FAILED_SCORE, resp: error });

export default (score) => (
  async (dispatch) => {
    try {
      return dispatch(addScore(score));
    } catch (error) {
      return dispatch(addScoreFailed(error));
    }
  }
);
