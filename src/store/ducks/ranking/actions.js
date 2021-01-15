import rankingTypes from './types';

const addPlayer = (player) => ({
  type: rankingTypes.ADD_PLAYER,
  payload: player,
});

export default addPlayer;
