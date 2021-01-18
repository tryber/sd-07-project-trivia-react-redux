import RankingTypes from './types';
import initialState from '../initialState';

const INITIAL_STATE = initialState.ranking;

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RankingTypes.GET_CURRENT_PLAYER: {
    return [...state, { name: action.name, score: action.score, picture: `https://www.gravatar.com/avatar/${action.hash}` }];
  }
  default:
    return state;
  }
};

export default ranking;
