const LOGIN = 'LOGIN';
const ADD_SCORE = 'ADD_SCORE';

const playerLoginAction = (player) => ({
  type: LOGIN,
  name: player.name,
  emailGravatar: player.emailGravatar,
});

const playerAddScoreAction = (player) => ({
  type: ADD_SCORE,
  score: player.score,
  assertions: player.assertions,
});

export { playerAddScoreAction, playerLoginAction, LOGIN, ADD_SCORE };
