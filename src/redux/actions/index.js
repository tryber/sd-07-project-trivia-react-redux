export const LOG_IN = 'LOG_IN';
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
export const THROW_TIME = 'THROW_TIME';

export const logIn = (token) => ({ type: LOG_IN, payload: token });

export const getToken = () => async (dispatch) => {
  const reponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await reponse.json();
  localStorage.setItem('token', token);
  return dispatch(logIn(token));
};

export const questionAnswered = () => ({
  type: QUESTION_ANSWERED,
  payload: true,
});

export const throwTime = (time) => ({
  type: THROW_TIME,
  payload: time,
});
