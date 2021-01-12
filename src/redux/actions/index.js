export const LOG_IN = 'LOG_IN';
export const SET_PLAYER = 'SET_PLAYER';

export const logIn = (token) => ({ type: LOG_IN, payload: token });

export const getToken = () => async (dispatch) => {
  const reponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await reponse.json();
  localStorage.setItem('token', token);
  return dispatch(logIn(token));
};

export const setPlayer = (data) => {
  const player = {
    ...data,
    assertions: 0,
    score: 0,
  };

  localStorage.setItem('player', JSON.stringify(player));
  return {
    type: SET_PLAYER,
    payload: player,
  };
};
