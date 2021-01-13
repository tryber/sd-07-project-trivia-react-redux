export const PLAYER = 'PLAYER';

export const playerAction = (player) => {
  localStorage.setItem('state', JSON.stringify({ player }));
  return {
    type: PLAYER,
    player,
  };
};
