import * as api from '../services/api';

const SIGN_IN = 'SIGN_IN';
const GAME_DATA = 'GAME_DATA';

export const signIn = (name, email) => ({
  type: SIGN_IN,
  name,
  email,
});

//--------------------------------------------------------

const gameData = (token, data) => ({
  type: GAME_DATA,
  token,
  data,
});

export function fetchApi() {
  return async (dispatch) => {
    const token = await api.fetchToken();
    const data = await api.fetchTrivia(token);
    dispatch(gameData(token, data));
  };
}
