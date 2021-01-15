import rankingTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.ranking;

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case rankingTypes.ADD_PLAYER:
    action.payload.index = state.nextIndex;
    return {
      ranking: [...state.ranking, action.payload],
      nextIndex: state.nextIndex + 1,
    };
  default:
    return state;
  }
};

export default ranking;
