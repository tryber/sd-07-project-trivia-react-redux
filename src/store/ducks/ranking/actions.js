import RankingTypes from './types';

const getCurrentPlayer = (name, score, hash) => ({
  type: RankingTypes.GET_CURRENT_PLAYER,
  name,
  score,
  hash,
});

export default getCurrentPlayer;
