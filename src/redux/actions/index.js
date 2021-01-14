export const LOG_IN = 'LOG_IN';
export const SET_PLAYER = 'SET_PLAYER';
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
export const THROW_TIME = 'THROW_TIME';
export const SET_SCORE = 'SET_SCORE';

export const logIn = (token) => ({ type: LOG_IN, payload: token });

export const getToken = () => async (dispatch) => {
  const reponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await reponse.json();
  localStorage.setItem('token', token);
  return dispatch(logIn(token));
};

export const setPlayer = (player) => {
  localStorage.setItem('state', JSON.stringify({ player }));
  return {
    type: SET_PLAYER,
    payload: player,
  };
};

export const questionAnswered = (isAnswered, isCorrect) => ({
  type: QUESTION_ANSWERED,
  isAnswered,
  isCorrect,
});

export const throwTime = (time) => ({
  type: THROW_TIME,
  payload: time,
});

export const changeScore = (value) => ({ type: SET_SCORE, payload: value });

export const setScore = (isAnswered, isCorrect, time, diff) => (dispatch) => {
  const difficulty = {
    hard: 3,
    medium: 2,
    easy: 1,
    none: 0,
  };
  const baseScore = 10;
  const newScore = isCorrect ? baseScore + difficulty[diff] * time : 0;

  const state = JSON.parse(localStorage.getItem('state'));
  if (isCorrect) state.player.assertions += 1;
  state.player.score += newScore;

  dispatch(setPlayer(state.player));
  dispatch(questionAnswered(isAnswered, isCorrect));
  return dispatch(changeScore(newScore));
};

export const nextQuestion = () => (dispatch) => {
  const initialTimer = 30;
  dispatch(questionAnswered(false, false));
  return dispatch(throwTime(initialTimer));
};
